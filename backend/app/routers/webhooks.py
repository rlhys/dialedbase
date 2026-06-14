"""Square webhook receiver — unprotected, HMAC-verified."""
import json
import logging

from fastapi import APIRouter, Request, Response, status

from ..config import settings
from ..db import db
from ..models.common import utcnow
from ..services import reconcile

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/webhooks", tags=["webhooks"])


def _verify(raw_body: bytes, signature: str | None) -> bool:
    """Verify Square's HMAC signature. If no signature key is configured
    (e.g. local dev), accept — but log a warning."""
    if not settings.SQUARE_WEBHOOK_SIGNATURE_KEY:
        logger.warning("SQUARE_WEBHOOK_SIGNATURE_KEY not set; skipping verification.")
        return True
    if not signature:
        return False
    try:
        from square.utils.webhooks_helper import verify_signature
        return verify_signature(
            request_body=raw_body.decode("utf-8"),
            signature_header=signature,
            signature_key=settings.SQUARE_WEBHOOK_SIGNATURE_KEY,
            notification_url=settings.SQUARE_WEBHOOK_NOTIFICATION_URL,
        )
    except Exception as exc:  # pragma: no cover
        logger.error("Webhook signature verification failed: %s", exc)
        return False


@router.post("/square")
async def square_webhook(request: Request):
    raw = await request.body()
    signature = request.headers.get("x-square-hmacsha256-signature")
    if not _verify(raw, signature):
        return Response(status_code=status.HTTP_401_UNAUTHORIZED, content="invalid signature")

    try:
        event = json.loads(raw.decode("utf-8"))
    except Exception:
        return Response(status_code=status.HTTP_400_BAD_REQUEST, content="bad payload")

    event_id = event.get("event_id") or event.get("id")
    event_type = event.get("type", "")

    # Idempotency: unique _id on event_id means a duplicate insert short-circuits.
    if event_id:
        try:
            await db.webhook_events.insert_one(
                {"_id": event_id, "type": event_type, "received_at": utcnow(), "processed": False}
            )
        except Exception:
            return {"ok": True, "duplicate": True}

    data_object = (event.get("data") or {}).get("object") or {}
    try:
        await reconcile.dispatch(event_type, data_object)
        if event_id:
            await db.webhook_events.update_one({"_id": event_id}, {"$set": {"processed": True}})
    except Exception as exc:
        logger.exception("Webhook reconcile failed for %s: %s", event_type, exc)
        # 500 → Square will retry; dedupe table makes the retry safe.
        return Response(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content="reconcile error")

    return {"ok": True}

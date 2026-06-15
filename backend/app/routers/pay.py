"""Public, client-facing payment endpoints (no admin auth).

Token-secured: each link carries a signed save_card token identifying the
client. Used by the hosted /pay/save-card page (Square Web Payments SDK).
"""
import logging
from datetime import timedelta

from fastapi import APIRouter, HTTPException, status
from jose import JWTError
from pydantic import BaseModel

from ..config import settings
from ..db import db
from ..models.common import PaymentSource, PaymentStatus, PaymentType, utcnow
from ..models.payment import Payment
from ..models.subscription import Subscription
from ..security import verify_card_session_token
from ..serialize import to_doc
from ..services import square_client as sq

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/pay", tags=["pay"])


class SaveCardBody(BaseModel):
    source_id: str  # nonce from the Web Payments SDK


async def _client_from_token(token: str) -> dict:
    try:
        client_id = verify_card_session_token(token)
    except JWTError:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "This link is invalid or has expired")
    doc = await db.clients.find_one({"id": client_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Client not found")
    return doc


@router.get("/card-session/{token}")
async def card_session(token: str):
    """Public config + display info for the save-card page."""
    client = await _client_from_token(token)
    if not settings.SQUARE_APPLICATION_ID:
        raise HTTPException(status.HTTP_503_SERVICE_UNAVAILABLE, "Card capture is not configured yet")
    settings_doc = await db.app_settings.find_one({"id": "singleton"}, {"_id": 0}) or {}
    return {
        "client_name": client.get("name"),
        "business_name": settings_doc.get("business_name", "dialedbase"),
        "monthly_amount": client.get("monthly_recurring_amount", 0),
        "currency": client.get("currency", "GBP"),
        "already_active": bool(client.get("square_subscription_id")),
        "application_id": settings.SQUARE_APPLICATION_ID,
        "location_id": settings.SQUARE_LOCATION_ID,
        "environment": settings.SQUARE_ENVIRONMENT,
    }


@router.post("/save-card/{token}")
async def save_card(token: str, body: SaveCardBody):
    """Save the client's card on file and auto-start their monthly subscription."""
    client = await _client_from_token(token)
    customer_id = client.get("square_customer_id")
    if not customer_id:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "No Square customer linked")

    # 1) Save the card on file.
    try:
        card = await sq.create_card_on_file(customer_id=customer_id, source_id=body.source_id)
    except sq.SquareError as exc:
        raise HTTPException(status.HTTP_402_PAYMENT_REQUIRED, f"Card could not be saved: {exc}")
    card_id = card.get("id")
    await db.clients.update_one(
        {"id": client["id"]}, {"$set": {"square_card_id": card_id, "updated_at": utcnow()}}
    )

    # 2) Auto-start the subscription (if not already active and a monthly amount is set).
    if client.get("square_subscription_id"):
        return {"ok": True, "subscription_started": False, "message": "Card saved; subscription already active."}

    amount = client.get("monthly_recurring_amount", 0)
    currency = client.get("currency", "GBP")
    plan = settings.SQUARE_DEFAULT_PLAN_VARIATION_ID
    if amount <= 0 or not plan:
        return {"ok": True, "subscription_started": False, "message": "Card saved."}

    try:
        sub = await sq.create_subscription(
            customer_id=customer_id,
            plan_variation_id=plan,
            amount=amount,
            currency=currency,
            card_id=card_id,
        )
    except sq.SquareError as exc:
        logger.error("Subscription create failed after card save: %s", exc)
        return {"ok": True, "subscription_started": False, "message": "Card saved; we'll start billing shortly."}

    sub_id = sub.get("id")
    record = Subscription(
        client_id=client["id"],
        square_subscription_id=sub_id,
        square_plan_variation_id=plan,
        status=sub.get("status", "ACTIVE"),
        amount=amount,
        currency=currency,
        start_date=utcnow(),
    )
    await db.subscriptions.insert_one(to_doc(record))
    await db.clients.update_one(
        {"id": client["id"]},
        {"$set": {"square_subscription_id": sub_id, "status": "active", "updated_at": utcnow()}},
    )
    first = Payment(
        client_id=client["id"],
        type=PaymentType.recurring,
        amount=amount,
        currency=currency,
        status=PaymentStatus.pending,
        due_date=utcnow() + timedelta(days=30),
        source=PaymentSource.square_subscription,
        note="First recurring cycle",
    )
    await db.payments.insert_one(to_doc(first))
    return {"ok": True, "subscription_started": True, "message": "Card saved and subscription started."}

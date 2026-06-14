"""Square admin-initiated actions — protected."""
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException, status

from ..config import settings
from ..db import db
from ..models.common import PaymentSource, PaymentStatus, PaymentType, utcnow
from ..models.payment import Payment
from ..models.subscription import Subscription
from ..security import get_current_admin
from ..serialize import to_doc
from ..services import square_client as sq

router = APIRouter(prefix="/square", tags=["square"], dependencies=[Depends(get_current_admin)])


def _sq_error(exc: Exception) -> HTTPException:
    if isinstance(exc, sq.SquareNotConfigured):
        return HTTPException(status.HTTP_503_SERVICE_UNAVAILABLE, str(exc))
    return HTTPException(status.HTTP_502_BAD_GATEWAY, f"Square error: {exc}")


async def _get_client_or_404(client_id: str) -> dict:
    doc = await db.clients.find_one({"id": client_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Client not found")
    return doc


@router.get("/health")
async def square_health():
    try:
        return await sq.health()
    except sq.SquareNotConfigured as exc:
        return {"ok": False, "configured": False, "detail": str(exc)}
    except Exception as exc:
        return {"ok": False, "configured": True, "detail": str(exc)}


@router.post("/clients/{client_id}/customer")
async def create_square_customer(client_id: str):
    client = await _get_client_or_404(client_id)
    if client.get("square_customer_id"):
        return {"square_customer_id": client["square_customer_id"], "already_linked": True}
    try:
        cid = await sq.create_customer(
            name=client["name"], email=client.get("email"), phone=client.get("phone")
        )
    except Exception as exc:
        raise _sq_error(exc)
    await db.clients.update_one(
        {"id": client_id}, {"$set": {"square_customer_id": cid, "updated_at": utcnow()}}
    )
    return {"square_customer_id": cid, "already_linked": False}


@router.post("/clients/{client_id}/deposit-link")
async def create_deposit_link(client_id: str):
    client = await _get_client_or_404(client_id)
    amount = client.get("deposit_amount", 0)
    if amount <= 0:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Client has no deposit amount set")
    currency = client.get("currency", "USD")

    # Persist a pending deposit payment up front so its id seeds idempotency.
    payment = Payment(
        client_id=client_id,
        type=PaymentType.deposit,
        amount=amount,
        currency=currency,
        status=PaymentStatus.pending,
        due_date=utcnow(),
        source=PaymentSource.square_link,
        note="Deposit payment link",
    )
    try:
        link = await sq.create_deposit_link(
            name=f"{client['name']} — Deposit",
            amount=amount,
            currency=currency,
            payment_id=payment.id,
        )
    except Exception as exc:
        raise _sq_error(exc)

    payment.square_payment_link_id = link.get("id")
    payment.square_payment_link_url = link.get("url")
    payment.square_order_id = link.get("order_id")
    await db.payments.insert_one(to_doc(payment))
    return {"payment_id": payment.id, "url": link.get("url"), "square_order_id": link.get("order_id")}


@router.post("/clients/{client_id}/subscription")
async def start_subscription(client_id: str):
    client = await _get_client_or_404(client_id)
    if client.get("square_subscription_id"):
        raise HTTPException(status.HTTP_409_CONFLICT, "Client already has a subscription")
    customer_id = client.get("square_customer_id")
    if not customer_id:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            "Create a Square customer (with a card on file) for this client first",
        )
    plan_variation_id = settings.SQUARE_DEFAULT_PLAN_VARIATION_ID
    if not plan_variation_id:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            "SQUARE_DEFAULT_PLAN_VARIATION_ID is not configured",
        )
    amount = client.get("monthly_recurring_amount", 0)
    currency = client.get("currency", "USD")
    try:
        sub = await sq.create_subscription(
            customer_id=customer_id,
            plan_variation_id=plan_variation_id,
            amount=amount,
            currency=currency,
        )
    except Exception as exc:
        raise _sq_error(exc)

    sub_id = sub.get("id")
    record = Subscription(
        client_id=client_id,
        square_subscription_id=sub_id,
        square_plan_variation_id=plan_variation_id,
        status=sub.get("status", "ACTIVE"),
        amount=amount,
        currency=currency,
        start_date=utcnow(),
    )
    await db.subscriptions.insert_one(to_doc(record))
    await db.clients.update_one(
        {"id": client_id},
        {"$set": {"square_subscription_id": sub_id, "status": "active", "updated_at": utcnow()}},
    )

    # Seed the first pending recurring payment for visibility.
    first = Payment(
        client_id=client_id,
        type=PaymentType.recurring,
        amount=amount,
        currency=currency,
        status=PaymentStatus.pending,
        due_date=utcnow() + timedelta(days=30),
        source=PaymentSource.square_subscription,
        note="First recurring cycle",
    )
    await db.payments.insert_one(to_doc(first))
    return {"square_subscription_id": sub_id, "status": record.status}


@router.post("/subscriptions/{subscription_id}/cancel")
async def cancel_subscription(subscription_id: str):
    record = await db.subscriptions.find_one({"id": subscription_id}, {"_id": 0})
    if not record:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Subscription not found")
    try:
        await sq.cancel_subscription(subscription_id=record["square_subscription_id"])
    except Exception as exc:
        raise _sq_error(exc)
    await db.subscriptions.update_one(
        {"id": subscription_id},
        {"$set": {"status": "CANCELED", "canceled_date": utcnow(), "updated_at": utcnow()}},
    )
    await db.clients.update_one(
        {"id": record["client_id"]},
        {"$set": {"square_subscription_id": None, "updated_at": utcnow()}},
    )
    return {"canceled": True}

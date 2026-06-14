"""Reconcile Square webhook events into local Payment/Subscription records.

All upserts are keyed on Square ids so replays are safe.
"""
import logging
from datetime import datetime, timezone

from ..db import db
from ..models.common import PaymentSource, PaymentStatus, PaymentType, new_id, utcnow

logger = logging.getLogger(__name__)


def _money_amount(money: dict | None) -> int:
    if not money:
        return 0
    return int(money.get("amount") or 0)


async def _mark_payment_paid(*, order_id=None, square_payment_id=None, paid_at=None, amount=None):
    query = None
    if order_id:
        query = {"square_order_id": order_id}
    elif square_payment_id:
        query = {"square_payment_id": square_payment_id}
    if not query:
        return
    update = {
        "status": PaymentStatus.paid.value,
        "paid_at": paid_at or utcnow(),
        "updated_at": utcnow(),
    }
    if square_payment_id:
        update["square_payment_id"] = square_payment_id
    if amount:
        update["amount"] = amount
    await db.payments.update_one(query, {"$set": update})


async def handle_payment(obj: dict):
    payment = obj.get("payment") or {}
    pstatus = (payment.get("status") or "").upper()
    sq_id = payment.get("id")
    order_id = payment.get("order_id")
    amount = _money_amount(payment.get("amount_money"))
    if pstatus == "COMPLETED":
        await _mark_payment_paid(
            order_id=order_id, square_payment_id=sq_id, amount=amount or None
        )
    elif pstatus in ("FAILED", "CANCELED"):
        q = {"square_order_id": order_id} if order_id else {"square_payment_id": sq_id}
        await db.payments.update_one(
            q, {"$set": {"status": PaymentStatus.failed.value, "updated_at": utcnow()}}
        )


async def handle_invoice_payment(obj: dict):
    invoice = obj.get("invoice") or {}
    subscription_id = invoice.get("subscription_id")
    invoice_id = invoice.get("id")
    # Total from payment_requests if present.
    amount = 0
    for req in invoice.get("payment_requests", []) or []:
        amount += _money_amount(req.get("computed_amount_money") or req.get("fixed_amount_requested_money"))

    sub = None
    if subscription_id:
        sub = await db.subscriptions.find_one(
            {"square_subscription_id": subscription_id}, {"_id": 0}
        )
    if not sub:
        logger.info("invoice.payment_made for unknown subscription %s", subscription_id)
        return
    # Upsert a paid recurring payment keyed on the invoice id (idempotent).
    existing = await db.payments.find_one({"square_invoice_id": invoice_id}, {"_id": 0, "id": 1})
    if existing:
        await db.payments.update_one(
            {"square_invoice_id": invoice_id},
            {"$set": {"status": PaymentStatus.paid.value, "paid_at": utcnow(), "updated_at": utcnow()}},
        )
        return
    doc = {
        "id": new_id(),
        "client_id": sub["client_id"],
        "type": PaymentType.recurring.value,
        "amount": amount or sub.get("amount", 0),
        "currency": sub.get("currency", "USD"),
        "status": PaymentStatus.paid.value,
        "due_date": utcnow(),
        "paid_at": utcnow(),
        "source": PaymentSource.square_subscription.value,
        "square_invoice_id": invoice_id,
        "created_at": utcnow(),
        "updated_at": utcnow(),
    }
    await db.payments.insert_one(doc)


async def handle_subscription(obj: dict):
    sub = obj.get("subscription") or {}
    sq_id = sub.get("id")
    if not sq_id:
        return
    sstatus = sub.get("status", "ACTIVE")
    await db.subscriptions.update_one(
        {"square_subscription_id": sq_id},
        {"$set": {"status": sstatus, "updated_at": utcnow()}},
    )
    if sstatus in ("CANCELED", "DEACTIVATED"):
        await db.subscriptions.update_one(
            {"square_subscription_id": sq_id}, {"$set": {"canceled_date": utcnow()}}
        )


async def handle_refund(obj: dict):
    refund = obj.get("refund") or {}
    payment_id = refund.get("payment_id")
    if payment_id:
        await db.payments.update_one(
            {"square_payment_id": payment_id},
            {"$set": {"status": PaymentStatus.refunded.value, "updated_at": utcnow()}},
        )


_DISPATCH = {
    "payment.created": handle_payment,
    "payment.updated": handle_payment,
    "invoice.payment_made": handle_invoice_payment,
    "subscription.created": handle_subscription,
    "subscription.updated": handle_subscription,
    "refund.created": handle_refund,
    "refund.updated": handle_refund,
}


async def dispatch(event_type: str, data_object: dict):
    handler = _DISPATCH.get(event_type)
    if handler:
        await handler(data_object)
    else:
        logger.info("Unhandled Square event type: %s", event_type)

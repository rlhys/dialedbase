"""Payments router — protected."""
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pymongo import DESCENDING

from ..db import db
from ..models.common import (
    PaymentSource,
    PaymentStatus,
    PaymentType,
    ensure_aware,
    utcnow,
)
from ..models.payment import Payment, PaymentCreate, PaymentOut, PaymentUpdate
from ..security import get_current_admin
from ..serialize import dump_update, to_doc

router = APIRouter(prefix="/payments", tags=["payments"], dependencies=[Depends(get_current_admin)])


async def _enrich_payments(docs: list[dict]) -> list[PaymentOut]:
    """Add derived `overdue` flag and denormalized client_name."""
    now = datetime.now(timezone.utc)
    client_ids = list({d["client_id"] for d in docs})
    names: dict[str, str] = {}
    if client_ids:
        async for c in db.clients.find({"id": {"$in": client_ids}}, {"_id": 0, "id": 1, "name": 1}):
            names[c["id"]] = c.get("name")
    out = []
    for d in docs:
        due = ensure_aware(d.get("due_date"))
        overdue = d.get("status") == PaymentStatus.pending.value and due is not None and due < now
        out.append(PaymentOut(**d, overdue=overdue, client_name=names.get(d["client_id"])))
    return out


@router.get("", response_model=list[PaymentOut])
async def list_payments(
    status_filter: PaymentStatus | None = Query(None, alias="status"),
    type_filter: PaymentType | None = Query(None, alias="type"),
    client_id: str | None = None,
    overdue: bool | None = None,
    skip: int = 0,
    limit: int = Query(300, le=1000),
):
    query: dict = {}
    if status_filter:
        query["status"] = status_filter.value
    if type_filter:
        query["type"] = type_filter.value
    if client_id:
        query["client_id"] = client_id
    if overdue:
        query["status"] = PaymentStatus.pending.value
        query["due_date"] = {"$lt": datetime.now(timezone.utc)}
    docs = await db.payments.find(query, {"_id": 0}).sort("due_date", DESCENDING).skip(skip).limit(limit).to_list(limit)
    return await _enrich_payments(docs)


@router.post("", response_model=PaymentOut, status_code=status.HTTP_201_CREATED)
async def create_payment(body: PaymentCreate):
    if not await db.clients.find_one({"id": body.client_id}, {"_id": 1}):
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Client not found")
    payment = Payment(**body.model_dump())
    await db.payments.insert_one(to_doc(payment))
    enriched = await _enrich_payments([payment.model_dump()])
    return enriched[0]


@router.get("/{payment_id}", response_model=PaymentOut)
async def get_payment(payment_id: str):
    doc = await db.payments.find_one({"id": payment_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Payment not found")
    enriched = await _enrich_payments([doc])
    return enriched[0]


@router.patch("/{payment_id}", response_model=PaymentOut)
async def update_payment(payment_id: str, body: PaymentUpdate):
    update = dump_update(body)
    if not update:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "No fields to update")
    update["updated_at"] = utcnow()
    res = await db.payments.update_one({"id": payment_id}, {"$set": update})
    if res.matched_count == 0:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Payment not found")
    doc = await db.payments.find_one({"id": payment_id}, {"_id": 0})
    enriched = await _enrich_payments([doc])
    return enriched[0]


@router.delete("/{payment_id}")
async def delete_payment(payment_id: str):
    res = await db.payments.delete_one({"id": payment_id})
    if res.deleted_count == 0:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Payment not found")
    return {"deleted": True}


@router.post("/{payment_id}/mark-paid", response_model=PaymentOut)
async def mark_paid(payment_id: str):
    res = await db.payments.update_one(
        {"id": payment_id},
        {"$set": {"status": PaymentStatus.paid.value, "paid_at": utcnow(), "updated_at": utcnow()}},
    )
    if res.matched_count == 0:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Payment not found")
    doc = await db.payments.find_one({"id": payment_id}, {"_id": 0})
    enriched = await _enrich_payments([doc])
    return enriched[0]

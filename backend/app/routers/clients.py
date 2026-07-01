"""Clients (CRM) router — protected."""
import re
from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pymongo import ASCENDING, DESCENDING
from pymongo.errors import DuplicateKeyError

from ..db import db
from ..models.client import Client, ClientCreate, ClientOut, ClientUpdate
from ..models.common import ClientStatus, ensure_aware, utcnow
from ..security import get_current_admin
from ..serialize import dump_update, to_doc

router = APIRouter(prefix="/clients", tags=["clients"], dependencies=[Depends(get_current_admin)])


async def _payment_rollup(client_ids: list[str]) -> dict[str, dict]:
    """Aggregate per-client payment stats in one pass."""
    if not client_ids:
        return {}
    now = datetime.now(timezone.utc)
    pipeline = [
        {"$match": {"client_id": {"$in": client_ids}}},
        {"$group": {
            "_id": "$client_id",
            "outstanding_balance": {
                "$sum": {"$cond": [{"$eq": ["$status", "pending"]}, "$amount", 0]}
            },
            "paid_total": {
                "$sum": {"$cond": [{"$eq": ["$status", "paid"]}, "$amount", 0]}
            },
            "overdue_count": {
                "$sum": {"$cond": [
                    {"$and": [{"$eq": ["$status", "pending"]}, {"$lt": ["$due_date", now]}]},
                    1, 0,
                ]}
            },
            "next_payment_due": {
                "$min": {"$cond": [{"$eq": ["$status", "pending"]}, "$due_date", None]}
            },
        }},
    ]
    out: dict[str, dict] = {}
    async for row in db.payments.aggregate(pipeline):
        out[row["_id"]] = row
    return out


def _to_out(doc: dict, roll: dict | None) -> ClientOut:
    roll = roll or {}
    return ClientOut(
        **doc,
        outstanding_balance=roll.get("outstanding_balance", 0),
        paid_total=roll.get("paid_total", 0),
        overdue_count=roll.get("overdue_count", 0),
        next_payment_due=ensure_aware(roll.get("next_payment_due")),
    )


@router.get("", response_model=list[ClientOut])
async def list_clients(
    status_filter: ClientStatus | None = Query(None, alias="status"),
    search: str | None = None,
    skip: int = 0,
    limit: int = Query(200, le=500),
):
    query: dict = {}
    if status_filter:
        query["status"] = status_filter.value
    if search:
        # Escape so the input is matched literally (no regex/ReDoS surprises).
        safe = re.escape(search[:100])
        query["$or"] = [
            {"name": {"$regex": safe, "$options": "i"}},
            {"company": {"$regex": safe, "$options": "i"}},
            {"email": {"$regex": safe, "$options": "i"}},
        ]
    docs = await db.clients.find(query, {"_id": 0}).sort("created_at", DESCENDING).skip(skip).limit(limit).to_list(limit)
    rollups = await _payment_rollup([d["id"] for d in docs])
    return [_to_out(d, rollups.get(d["id"])) for d in docs]


@router.post("", response_model=ClientOut, status_code=status.HTTP_201_CREATED)
async def create_client(body: ClientCreate):
    client = Client(**body.model_dump())
    try:
        await db.clients.insert_one(to_doc(client))
    except DuplicateKeyError:
        raise HTTPException(status.HTTP_409_CONFLICT, "A client with that email already exists")
    return _to_out(client.model_dump(), None)


@router.get("/{client_id}", response_model=ClientOut)
async def get_client(client_id: str):
    doc = await db.clients.find_one({"id": client_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Client not found")
    rollups = await _payment_rollup([client_id])
    return _to_out(doc, rollups.get(client_id))


@router.patch("/{client_id}", response_model=ClientOut)
async def update_client(client_id: str, body: ClientUpdate):
    update = dump_update(body)
    if not update:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "No fields to update")
    update["updated_at"] = utcnow()
    try:
        res = await db.clients.update_one({"id": client_id}, {"$set": update})
    except DuplicateKeyError:
        raise HTTPException(status.HTTP_409_CONFLICT, "A client with that email already exists")
    if res.matched_count == 0:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Client not found")
    doc = await db.clients.find_one({"id": client_id}, {"_id": 0})
    rollups = await _payment_rollup([client_id])
    return _to_out(doc, rollups.get(client_id))


@router.delete("/{client_id}")
async def delete_client(client_id: str, hard: bool = False):
    if hard:
        res = await db.clients.delete_one({"id": client_id})
        if res.deleted_count == 0:
            raise HTTPException(status.HTTP_404_NOT_FOUND, "Client not found")
        await db.payments.delete_many({"client_id": client_id})
        return {"deleted": True, "hard": True}
    res = await db.clients.update_one(
        {"id": client_id},
        {"$set": {"status": ClientStatus.churned.value, "updated_at": utcnow()}},
    )
    if res.matched_count == 0:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Client not found")
    return {"deleted": True, "hard": False, "status": "churned"}


@router.get("/{client_id}/payments")
async def client_payments(client_id: str):
    from .payments import _enrich_payments  # local import avoids circular dependency
    docs = await db.payments.find({"client_id": client_id}, {"_id": 0}).sort("due_date", ASCENDING).to_list(1000)
    return await _enrich_payments(docs)

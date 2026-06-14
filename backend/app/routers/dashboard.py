"""Dashboard / analytics router — protected. Feeds the Recharts graphs."""
from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, Query

from ..db import db
from ..models.common import ensure_aware
from ..security import get_current_admin
from ..services.reminders import overdue_payments, upcoming_payments
from .payments import _enrich_payments

router = APIRouter(prefix="/dashboard", tags=["dashboard"], dependencies=[Depends(get_current_admin)])

_GRANULARITY = {"week": "week", "month": "month", "year": "year"}


@router.get("/summary")
async def summary():
    """KPI snapshot computed in a single $facet pass over payments."""
    now = datetime.now(timezone.utc)
    month_start = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)

    facet = {
        "total_paid": [
            {"$match": {"status": "paid"}},
            {"$group": {"_id": None, "v": {"$sum": "$amount"}}},
        ],
        "paid_this_month": [
            {"$match": {"status": "paid", "paid_at": {"$gte": month_start}}},
            {"$group": {"_id": None, "v": {"$sum": "$amount"}}},
        ],
        "pending_total": [
            {"$match": {"status": "pending"}},
            {"$group": {"_id": None, "v": {"$sum": "$amount"}}},
        ],
        "overdue_total": [
            {"$match": {"status": "pending", "due_date": {"$lt": now}}},
            {"$group": {"_id": None, "v": {"$sum": "$amount"}, "c": {"$sum": 1}}},
        ],
        "by_type": [
            {"$match": {"status": "paid"}},
            {"$group": {"_id": "$type", "v": {"$sum": "$amount"}}},
        ],
    }
    rows = await db.payments.aggregate([{"$facet": facet}]).to_list(1)
    f = rows[0] if rows else {}

    def scalar(key, field="v"):
        arr = f.get(key) or []
        return arr[0][field] if arr else 0

    by_type = {r["_id"]: r["v"] for r in (f.get("by_type") or [])}

    # MRR + active clients from subscriptions/clients.
    active_subs = await db.subscriptions.find({"status": "ACTIVE"}, {"_id": 0, "amount": 1}).to_list(1000)
    mrr = sum(s.get("amount", 0) for s in active_subs)
    active_clients = await db.clients.count_documents({"status": "active"})
    total_clients = await db.clients.count_documents({})

    return {
        "mrr": mrr,
        "active_clients": active_clients,
        "total_clients": total_clients,
        "total_collected": scalar("total_paid"),
        "collected_this_month": scalar("paid_this_month"),
        "outstanding": scalar("pending_total"),
        "overdue_total": scalar("overdue_total"),
        "overdue_count": scalar("overdue_total", "c"),
        "deposits_collected": by_type.get("deposit", 0),
        "recurring_collected": by_type.get("recurring", 0),
        "currency": "GBP",
    }


@router.get("/revenue")
async def revenue(
    granularity: str = Query("month", pattern="^(week|month|year)$"),
    months: int = Query(12, ge=1, le=60),
):
    """Paid revenue bucketed over time via $dateTrunc (needs MongoDB 5.0+)."""
    unit = _GRANULARITY[granularity]
    now = datetime.now(timezone.utc)
    start = now - timedelta(days=months * 31)
    pipeline = [
        {"$match": {"status": "paid", "paid_at": {"$gte": start, "$ne": None}}},
        {"$group": {
            "_id": {"$dateTrunc": {"date": "$paid_at", "unit": unit}},
            "total": {"$sum": "$amount"},
            "deposits": {"$sum": {"$cond": [{"$eq": ["$type", "deposit"]}, "$amount", 0]}},
            "recurring": {"$sum": {"$cond": [{"$eq": ["$type", "recurring"]}, "$amount", 0]}},
            "count": {"$sum": 1},
        }},
        {"$sort": {"_id": 1}},
    ]
    rows = await db.payments.aggregate(pipeline).to_list(500)
    return [
        {
            "period": ensure_aware(r["_id"]).isoformat() if r["_id"] else None,
            "total": r["total"],
            "deposits": r["deposits"],
            "recurring": r["recurring"],
            "count": r["count"],
        }
        for r in rows
    ]


@router.get("/mrr-trend")
async def mrr_trend(months: int = Query(12, ge=1, le=36)):
    """MRR per month: sum of subscription amounts active during each month-end."""
    subs = await db.subscriptions.find({}, {"_id": 0}).to_list(2000)
    now = datetime.now(timezone.utc)
    out = []
    # Build month-end markers, oldest -> newest.
    year, month = now.year, now.month
    markers = []
    for _ in range(months):
        markers.append(datetime(year, month, 1, tzinfo=timezone.utc))
        month -= 1
        if month == 0:
            month = 12
            year -= 1
    for m_start in reversed(markers):
        # End of this month window.
        nm_year, nm_month = (m_start.year + 1, 1) if m_start.month == 12 else (m_start.year, m_start.month + 1)
        m_end = datetime(nm_year, nm_month, 1, tzinfo=timezone.utc)
        total = 0
        for s in subs:
            start = ensure_aware(s.get("start_date")) or ensure_aware(s.get("created_at"))
            canceled = ensure_aware(s.get("canceled_date"))
            if start and start < m_end and (canceled is None or canceled >= m_end):
                total += s.get("amount", 0)
        out.append({"period": m_start.isoformat(), "mrr": total})
    return out


@router.get("/clients/breakdown")
async def clients_breakdown():
    pipeline = [{"$group": {"_id": "$status", "count": {"$sum": 1}}}]
    rows = await db.clients.aggregate(pipeline).to_list(20)
    return {r["_id"]: r["count"] for r in rows}


@router.get("/payments/upcoming")
async def payments_upcoming(days: int = Query(7, ge=1, le=90)):
    return await _enrich_payments(await upcoming_payments(days))


@router.get("/payments/overdue")
async def payments_overdue():
    return await _enrich_payments(await overdue_payments())

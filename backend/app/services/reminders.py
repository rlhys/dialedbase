"""Reminder computation (serverless-safe, computed on read).

No background worker exists on Vercel, so 'overdue' and 'upcoming' are computed
live from the payments collection whenever the admin opens the panel.
"""
from datetime import datetime, timedelta, timezone

from ..db import db


async def overdue_payments() -> list[dict]:
    now = datetime.now(timezone.utc)
    return await db.payments.find(
        {"status": "pending", "due_date": {"$lt": now}}, {"_id": 0}
    ).sort("due_date", 1).to_list(500)


async def upcoming_payments(days: int = 7) -> list[dict]:
    now = datetime.now(timezone.utc)
    horizon = now + timedelta(days=days)
    return await db.payments.find(
        {"status": "pending", "due_date": {"$gte": now, "$lte": horizon}}, {"_id": 0}
    ).sort("due_date", 1).to_list(500)

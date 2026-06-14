"""App settings + cron-driven reminders (tier-2 stub)."""
from fastapi import APIRouter, Depends, Header, HTTPException, status

from ..config import settings as app_settings
from ..db import db
from ..models.common import utcnow
from ..models.settings import SETTINGS_ID, AppSettings, AppSettingsUpdate
from ..security import get_current_admin
from ..serialize import dump_update
from ..services.reminders import overdue_payments, upcoming_payments

router = APIRouter(tags=["settings"])


async def _load_settings() -> AppSettings:
    doc = await db.app_settings.find_one({"id": SETTINGS_ID}, {"_id": 0})
    if not doc:
        s = AppSettings()
        await db.app_settings.insert_one(s.model_dump())
        return s
    return AppSettings(**doc)


@router.get("/settings", response_model=AppSettings, dependencies=[Depends(get_current_admin)])
async def get_settings():
    return await _load_settings()


@router.patch("/settings", response_model=AppSettings, dependencies=[Depends(get_current_admin)])
async def update_settings(body: AppSettingsUpdate):
    update = dump_update(body)
    if update:
        update["updated_at"] = utcnow()
        await db.app_settings.update_one({"id": SETTINGS_ID}, {"$set": update}, upsert=True)
    return await _load_settings()


@router.post("/internal/run-reminders")
async def run_reminders(x_cron_secret: str | None = Header(None)):
    """Tier-2 hook for a Vercel Cron job. Guarded by CRON_SECRET.

    Currently only returns the work that *would* be actioned (overdue +
    upcoming). Wire email/SMS sending here later.
    """
    if not app_settings.CRON_SECRET or x_cron_secret != app_settings.CRON_SECRET:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "Invalid cron secret")
    s = await _load_settings()
    overdue = await overdue_payments()
    upcoming = await upcoming_payments(s.upcoming_window_days)
    # TODO: send notifications (email/SMS) for each item.
    return {"overdue": len(overdue), "upcoming": len(upcoming), "notified": 0}

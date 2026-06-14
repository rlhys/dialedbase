"""Shared enums and helpers used across models."""
import uuid
from datetime import datetime, timezone
from enum import Enum


def new_id() -> str:
    return str(uuid.uuid4())


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


def ensure_aware(dt: datetime | None) -> datetime | None:
    """BSON returns naive UTC datetimes; coerce them back to tz-aware UTC."""
    if dt is None:
        return None
    if dt.tzinfo is None:
        return dt.replace(tzinfo=timezone.utc)
    return dt


class ClientStatus(str, Enum):
    lead = "lead"
    active = "active"
    paused = "paused"
    churned = "churned"


class PaymentType(str, Enum):
    deposit = "deposit"
    recurring = "recurring"


class PaymentStatus(str, Enum):
    pending = "pending"
    paid = "paid"
    failed = "failed"
    refunded = "refunded"
    # Note: `overdue` is derived at read time (pending + due_date < now),
    # never persisted, because serverless has no worker to flip it.


class PaymentSource(str, Enum):
    manual = "manual"
    square_link = "square_link"
    square_subscription = "square_subscription"
    square_invoice = "square_invoice"

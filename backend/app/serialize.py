"""Helpers to convert Pydantic models <-> Mongo documents.

Money stays as integer cents. Datetimes are stored natively (needed for
$dateTrunc aggregations). `date` objects must be promoted to `datetime`
because BSON cannot encode a bare date.
"""
from datetime import date, datetime, time, timezone

from pydantic import BaseModel


def _coerce(value):
    # datetime is a subclass of date, so check it first.
    if isinstance(value, datetime):
        return value
    if isinstance(value, date):
        return datetime.combine(value, time.min, tzinfo=timezone.utc)
    if isinstance(value, dict):
        return {k: _coerce(v) for k, v in value.items()}
    if isinstance(value, list):
        return [_coerce(v) for v in value]
    return value


def to_doc(model: BaseModel, exclude_none: bool = False) -> dict:
    """Pydantic model -> Mongo-ready dict (enums become their str values,
    dates become datetimes). Drops the Mongo `_id` if present."""
    data = model.model_dump(exclude_none=exclude_none)
    doc = {k: _coerce(v) for k, v in data.items()}
    doc.pop("_id", None)
    return doc


def dump_update(model: BaseModel) -> dict:
    """Build a $set-ready dict from a partial update model (skips unset)."""
    data = model.model_dump(exclude_unset=True)
    return {k: _coerce(v) for k, v in data.items()}

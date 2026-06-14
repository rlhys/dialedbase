"""MongoDB connection + index bootstrap.

The Motor client is created once at module import so it is reused across warm
serverless invocations (Vercel). Never open a new connection per request.
"""
import logging

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from pymongo import ASCENDING, IndexModel

from .config import settings

logger = logging.getLogger(__name__)

# Module-level singletons (reused across warm invocations).
_client = AsyncIOMotorClient(settings.MONGO_URL)
db: AsyncIOMotorDatabase = _client[settings.DB_NAME]


def get_client() -> AsyncIOMotorClient:
    return _client


async def get_db() -> AsyncIOMotorDatabase:
    """FastAPI dependency for handlers that prefer injection."""
    return db


async def bootstrap_indexes() -> None:
    """Create the indexes the admin panel relies on. Idempotent."""
    try:
        await db.clients.create_indexes([
            IndexModel([("email", ASCENDING)], unique=True, name="uq_email"),
            IndexModel([("status", ASCENDING)], name="ix_status"),
            IndexModel([("square_customer_id", ASCENDING)], name="ix_square_customer", sparse=True),
            IndexModel([("square_subscription_id", ASCENDING)], name="ix_square_sub", sparse=True),
        ])
        await db.payments.create_indexes([
            IndexModel([("client_id", ASCENDING)], name="ix_client"),
            IndexModel([("status", ASCENDING), ("due_date", ASCENDING)], name="ix_status_due"),
            IndexModel([("status", ASCENDING), ("paid_at", ASCENDING)], name="ix_status_paid"),
            IndexModel([("type", ASCENDING)], name="ix_type"),
            IndexModel([("square_payment_id", ASCENDING)], name="uq_sq_payment", unique=True, sparse=True),
            IndexModel([("square_invoice_id", ASCENDING)], name="ix_sq_invoice", sparse=True),
        ])
        await db.subscriptions.create_indexes([
            IndexModel([("client_id", ASCENDING)], name="ix_client"),
            IndexModel([("square_subscription_id", ASCENDING)], name="uq_sq_sub", unique=True),
        ])
        await db.admin_users.create_indexes([
            IndexModel([("email", ASCENDING)], unique=True, name="uq_email"),
        ])
        logger.info("MongoDB indexes ensured.")
    except Exception as exc:  # pragma: no cover - non-fatal on startup
        logger.warning("Index bootstrap skipped/failed: %s", exc)

"""dialedbase backend entrypoint (Vercel: `server:app`).

Thin: builds the FastAPI app, wires CORS + lifespan, and includes the admin
routers. All domain logic lives in the `app/` package.
"""
import logging
import uuid
from contextlib import asynccontextmanager
from datetime import datetime, timezone

from fastapi import APIRouter, FastAPI
from pydantic import BaseModel, ConfigDict, Field
from starlette.middleware.cors import CORSMiddleware

# config.py loads backend/.env via pydantic-settings on import.
from app.config import settings
from app.db import bootstrap_indexes, db, get_client
from app.routers import (
    auth,
    clients,
    dashboard,
    pay,
    payments,
    settings_router,
    square,
    webhooks,
)
from app.security import seed_admin

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await bootstrap_indexes()
    await seed_admin()
    yield
    get_client().close()


app = FastAPI(title="dialedbase admin API", lifespan=lifespan)

# --- Legacy status endpoints (kept for backwards compatibility) ---
api_router = APIRouter(prefix="/api")


class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


@api_router.get("/")
async def root():
    return {"message": "dialedbase admin API", "ok": True}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=list[StatusCheck])
async def get_status_checks():
    checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for c in checks:
        if isinstance(c.get("timestamp"), str):
            c["timestamp"] = datetime.fromisoformat(c["timestamp"])
    return checks


# --- Admin routers ---
api_router.include_router(auth.router)
api_router.include_router(clients.router)
api_router.include_router(payments.router)
api_router.include_router(dashboard.router)
api_router.include_router(square.router)
api_router.include_router(pay.router)
api_router.include_router(webhooks.router)
api_router.include_router(settings_router.router)

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=settings.cors_origins_list,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def security_headers(request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "no-referrer"
    response.headers["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains"
    return response

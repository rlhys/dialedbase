"""Thin async wrapper around the Square SDK.

Uses the new `squareup` SDK (`from square import AsyncSquare`). The client is
built lazily and cached so it is reused across warm serverless invocations.
All helpers return plain dicts and raise RuntimeError with a readable message
on failure, so routers can translate to HTTP errors.
"""
import logging
import uuid

from ..config import settings

logger = logging.getLogger(__name__)

_client = None


class SquareNotConfigured(RuntimeError):
    pass


class SquareError(RuntimeError):
    pass


def _idempotency_key(seed: str | None = None) -> str:
    return seed or str(uuid.uuid4())


def get_square():
    """Return a cached AsyncSquare client or raise if unconfigured / SDK missing."""
    global _client
    if _client is not None:
        return _client
    if not settings.square_is_configured:
        raise SquareNotConfigured("Square is not configured (missing access token / location id).")
    try:
        from square import AsyncSquare
        from square.environment import SquareEnvironment
    except Exception as exc:  # pragma: no cover
        raise SquareNotConfigured(f"Square SDK not installed: {exc}")

    env = (
        SquareEnvironment.PRODUCTION
        if settings.SQUARE_ENVIRONMENT.lower() == "production"
        else SquareEnvironment.SANDBOX
    )
    _client = AsyncSquare(token=settings.SQUARE_ACCESS_TOKEN, environment=env)
    return _client


def _as_dict(obj):
    """Best-effort conversion of an SDK response object to a plain dict."""
    if obj is None:
        return None
    for attr in ("model_dump", "dict"):
        fn = getattr(obj, attr, None)
        if callable(fn):
            try:
                return fn()
            except Exception:
                pass
    if isinstance(obj, dict):
        return obj
    return {k: getattr(obj, k) for k in dir(obj) if not k.startswith("_")}


async def health() -> dict:
    """Verify the token + location are reachable."""
    client = get_square()
    try:
        resp = await client.locations.get(location_id=settings.SQUARE_LOCATION_ID)
        loc = _as_dict(getattr(resp, "location", None)) or {}
        return {
            "ok": True,
            "environment": settings.SQUARE_ENVIRONMENT,
            "location_id": settings.SQUARE_LOCATION_ID,
            "location_name": loc.get("name"),
        }
    except Exception as exc:
        raise SquareError(str(exc))


async def create_customer(*, name: str, email: str | None, phone: str | None) -> str:
    """Create a Square customer, return its id."""
    client = get_square()
    parts = (name or "").strip().split(" ", 1)
    given = parts[0] if parts else name
    family = parts[1] if len(parts) > 1 else None
    try:
        resp = await client.customers.create(
            given_name=given,
            family_name=family,
            email_address=email,
            phone_number=phone,
            idempotency_key=_idempotency_key(),
        )
        cust = _as_dict(getattr(resp, "customer", None)) or {}
        cid = cust.get("id")
        if not cid:
            raise SquareError("Square did not return a customer id")
        return cid
    except SquareError:
        raise
    except Exception as exc:
        raise SquareError(str(exc))


async def create_deposit_link(*, name: str, amount: int, currency: str, payment_id: str) -> dict:
    """Create a one-time hosted Checkout Payment Link for a deposit."""
    client = get_square()
    try:
        resp = await client.checkout.payment_links.create(
            idempotency_key=_idempotency_key(payment_id),
            quick_pay={
                "name": name,
                "price_money": {"amount": amount, "currency": currency},
                "location_id": settings.SQUARE_LOCATION_ID,
            },
        )
        link = _as_dict(getattr(resp, "payment_link", None)) or {}
        return {
            "url": link.get("url") or link.get("long_url"),
            "id": link.get("id"),
            "order_id": link.get("order_id"),
        }
    except Exception as exc:
        raise SquareError(str(exc))


async def create_subscription(
    *,
    customer_id: str,
    plan_variation_id: str,
    amount: int,
    currency: str,
    card_id: str | None = None,
) -> dict:
    """Create a Square subscription for monthly recurring billing.

    Uses price_override_money so a single shared plan variation can bill each
    client their own monthly rate. If a card_id is supplied the subscription
    auto-charges that card; otherwise Square emails an invoice each cycle.
    """
    client = get_square()
    kwargs = dict(
        idempotency_key=_idempotency_key(),
        location_id=settings.SQUARE_LOCATION_ID,
        plan_variation_id=plan_variation_id,
        customer_id=customer_id,
    )
    if amount and amount > 0:
        kwargs["price_override_money"] = {"amount": amount, "currency": currency}
    if card_id:
        kwargs["card_id"] = card_id
    try:
        resp = await client.subscriptions.create(**kwargs)
        sub = _as_dict(getattr(resp, "subscription", None)) or {}
        return sub
    except Exception as exc:
        raise SquareError(str(exc))


async def list_subscription_plan_variations() -> list[dict]:
    """List Catalog subscription plan variations (id + name + price) so the
    admin can discover the plan variation id to configure."""
    client = get_square()
    out: list[dict] = []
    try:
        resp = await client.catalog.list(types="SUBSCRIPTION_PLAN_VARIATION")
        items = getattr(resp, "items", None) or getattr(resp, "objects", None) or []
        for obj in items:
            d = _as_dict(obj) or {}
            data = d.get("subscription_plan_variation_data") or {}
            out.append({"id": d.get("id"), "name": data.get("name")})
        return out
    except Exception as exc:
        raise SquareError(str(exc))


async def create_payment(
    *,
    source_id: str,
    amount: int,
    currency: str,
    customer_id: str | None = None,
    note: str | None = None,
    reference_id: str | None = None,
    verification_token: str | None = None,
    idempotency_seed: str | None = None,
) -> dict:
    """Charge a tokenized source (card / wallet / Clearpay) via Square Payments.
    Returns the created payment dict (id, order_id, status, ...)."""
    client = get_square()
    kwargs = dict(
        source_id=source_id,
        idempotency_key=_idempotency_key(idempotency_seed),
        amount_money={"amount": amount, "currency": currency},
        location_id=settings.SQUARE_LOCATION_ID,
    )
    if customer_id:
        kwargs["customer_id"] = customer_id
    if note:
        kwargs["note"] = note
    if reference_id:
        kwargs["reference_id"] = reference_id
    if verification_token:
        kwargs["verification_token"] = verification_token
    try:
        resp = await client.payments.create(**kwargs)
        return _as_dict(getattr(resp, "payment", None)) or {}
    except Exception as exc:
        raise SquareError(str(exc))


async def create_card_on_file(*, customer_id: str, source_id: str) -> dict:
    """Save a tokenized card (source_id/nonce from Web Payments SDK) on file
    for a customer. Returns the created card (incl. its id) as a dict."""
    client = get_square()
    try:
        resp = await client.cards.create(
            idempotency_key=_idempotency_key(),
            source_id=source_id,
            card={"customer_id": customer_id},
        )
        return _as_dict(getattr(resp, "card", None)) or {}
    except Exception as exc:
        raise SquareError(str(exc))


async def cancel_subscription(*, subscription_id: str) -> dict:
    client = get_square()
    try:
        resp = await client.subscriptions.cancel(subscription_id=subscription_id)
        return _as_dict(getattr(resp, "subscription", None)) or {}
    except Exception as exc:
        raise SquareError(str(exc))

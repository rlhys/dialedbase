# dialedbase Admin Panel

Private admin to manage clients, track deposits + monthly recurring payments via
SquareUp, and see revenue dashboards. Lives at **`/admin`** (login at `/admin/login`).

## Stack
- **Backend**: FastAPI + MongoDB (Motor), JWT single-admin auth, Square SDK (`squareup`).
  Code in [backend/app/](backend/app/); entrypoint stays [backend/server.py](backend/server.py).
- **Frontend**: React (CRA) + Tailwind + shadcn/ui + Framer Motion + Recharts.
  Code in [frontend/src/admin/](frontend/src/admin/).

## One-time setup

### 1. Backend env
Copy [backend/env.example](backend/env.example) to `backend/.env` and fill in:

```
MONGO_URL=...           # existing
DB_NAME=dialedbase
CORS_ORIGINS=http://localhost:3000

JWT_SECRET=<random>     # python -c "import secrets;print(secrets.token_urlsafe(48))"
ADMIN_EMAIL=rhysgbp@gmail.com
ADMIN_PASSWORD_HASH=<bcrypt hash>   # see below

SQUARE_ACCESS_TOKEN=...
SQUARE_ENVIRONMENT=sandbox          # or production
SQUARE_LOCATION_ID=...
SQUARE_WEBHOOK_SIGNATURE_KEY=...
SQUARE_WEBHOOK_NOTIFICATION_URL=https://<domain>/_/backend/api/webhooks/square
SQUARE_DEFAULT_PLAN_VARIATION_ID=...   # Catalog subscription plan variation for monthly billing
```

Generate the admin password hash:
```bash
cd backend
python -c "from passlib.context import CryptContext; print(CryptContext(schemes=['bcrypt']).hash('YOUR_PASSWORD'))"
```
The admin user is seeded automatically from `ADMIN_EMAIL` + `ADMIN_PASSWORD_HASH` on startup.

### 2. Install deps
```bash
cd backend && pip install -r requirements.txt
cd frontend && yarn install
```

## Run locally
```bash
# Terminal 1 — backend (serves /api on :8001)
cd backend && uvicorn server:app --reload --port 8001

# Terminal 2 — frontend
cd frontend && REACT_APP_BACKEND_URL=http://localhost:8001 yarn start
```
Open http://localhost:3000/admin/login. API docs at http://localhost:8001/docs.

In production on Vercel, leave `REACT_APP_BACKEND_URL` unset — the frontend calls
`/_/backend/api` (where Vercel routes the backend).

## Square setup
1. Create a Square app, copy the **access token**, **location id**, and **webhook
   signature key** into `.env`.
2. For monthly recurring: create a **Catalog subscription plan + plan variation**
   in Square and put the plan variation id in `SQUARE_DEFAULT_PLAN_VARIATION_ID`.
   Subscriptions auto-charge a **card on file**, so create the Square customer and
   have the client add a card before starting a subscription.
3. Register the webhook endpoint `…/_/backend/api/webhooks/square` and subscribe to:
   `payment.created`, `payment.updated`, `invoice.payment_made`,
   `subscription.created`, `subscription.updated`, `refund.created`.

## Features
- **Dashboard**: MRR, collected this month, total collected, outstanding, overdue;
  revenue-over-time (week/month/year), MRR trend, deposits-vs-recurring, client
  status breakdown, upcoming + overdue payment lists.
- **Clients**: searchable CRM with deposit/monthly amounts, status, project, notes.
- **Client detail**: Square actions (create customer, deposit payment link, start/track
  subscription), full payment history, mark-paid, add manual payment.
- **Payments**: all payments with filters and mark-paid.
- **Settings**: business defaults, reminder window, Square connection health check.

## Reminders
Overdue/upcoming are computed on read (no worker needed on serverless). An optional
cron endpoint `POST /api/internal/run-reminders` (guarded by `CRON_SECRET`) is stubbed
for future email/SMS notifications via a Vercel Cron job.

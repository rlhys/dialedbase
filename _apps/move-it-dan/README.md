# Move It Dan

Premium brand / marketing site rebuild for [moveitdan.co.uk](https://moveitdan.co.uk/), built by Dialedbase as a **Build → Site Care** engagement.

Stack: Next.js (App Router), TypeScript, Tailwind CSS v4, Lenis, GSAP ScrollTrigger, Motion.

Design lock: see `DESIGN.md`. Sacred logo at `public/logo.png` (transparent; source `public/logo.jpg`). On-dark variant `public/logo-on-dark.png`. Brand blue `#0073c5`.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Pages

- `/` Home
- `/services` Domestic, commercial, packing, overseas
- `/coverage` UK + overseas
- `/faq`
- `/reviews` Structure only until approved quotes arrive
- `/contact` Call CTA + quote form

## Content edits

Copy, phone, services, FAQ, and review slots live in `src/content/site.ts`.

Brand assets:

- Transparent logo: `public/logo.png` (also `brand/logo.jpg` source)
- On-dark logo: `public/logo-on-dark.png`
- O motif / favicon: `public/mark.png`, `public/favicon.png`
- Job photos in `public/placeholders/` and `brand/`

## Quote form

The contact form opens the visitor mail client with a prefilled quote request until a server endpoint or form provider is wired for Site Care.

## Deploy

Any Node host that supports Next.js works (Vercel, Netlify, etc.). Point DNS for `moveitdan.co.uk` after go-live approval.

## Still needed from client / Rhys

1. Fresh job photography (van, wrapping, unload) where current shots need upgrading
2. Exact service list additions (if any beyond current site)
3. Permissioned review text or public review links
4. Confirmed contact email (and WhatsApp if used)
5. Written OK before any dialedbase.com case study

# Move It Dan

Premium brand / marketing site rebuild for [moveitdan.co.uk](https://moveitdan.co.uk/), built by Dialedbase as a **Build → Site Care** engagement.

Stack: Next.js (App Router), TypeScript, Tailwind CSS v4.

Design lock: see `DESIGN.md`. Sacred logo at `public/logo.jpg` / `brand/logo.jpg`. Brand blue `#0073c5`.

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

Photography:

- Sacred logo: `public/logo.jpg` (also `brand/logo.jpg`)
- Job photos in `public/placeholders/` and `brand/`
- Labelled figures remain so weaker shots can be swapped without redesign
- Still welcome: sharper landscape hero crop, packing close-ups, unload day

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

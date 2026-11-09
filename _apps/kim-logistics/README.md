# Kim Logistics

Premium brand / marketing rebuild for [Kim Logistics](https://www.kimlogistics.co.uk/), a Coventry and West Midlands removals company.

Built by **Dialedbase** as a scoped **Build**, with a path into monthly **Site Care**.

## Design lock

See `DESIGN.md`. Sacred logos live in `brand/` and are mirrored under `public/images/`. Motto: **Keep It Moving**. Palette is black / white with one restrained CTA accent (signal orange).

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4
- Content module at `src/content/site.ts`

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Brand-first full-bleed hero, why us, services, areas, review, CTA |
| `/services` | Home, office, packing, man and van, long-distance, storage partners |
| `/areas` | Coventry + surrounding towns |
| `/faq` | Pricing guidance and booking FAQ (ranges subject to quote) |
| `/reviews` | Tommy Hyde testimonial only |
| `/contact` | Hours, phones, email, accessible free-quote form |

## Local development

```bash
npm install
npm run dev
```

```bash
npm run build
npm start
```

## Quote form

Currently opens a prefilled `mailto:` to `info@kimlogistics.co.uk`. Wire to Formspree, Resend, or an API route for production.

## Still needed from client

1. More photography (packing, interiors, crew).
2. Confirm service packaging and FAQ price ranges.
3. Written permission for reviews.
4. Final areas / out-of-area policy.
5. Form backend and domain cutover off Wix.
6. Written OK before any dialedbase.com case study.

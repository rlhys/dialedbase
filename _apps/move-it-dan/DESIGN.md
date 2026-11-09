# Move It Dan - design lock

Sacred logos: `public/logo-chalk.png` (dark surfaces), `public/logo-ink.png` (light surfaces). Never CSS-invert.

## Brand
- MOVE IT = black/white, DAN = blue `#0073c5`
- Neutrals: ink `#0c1624`, chalk, mist. Signal blue only for CTAs
- Mark: house + upward arrow inside the O - reuse for favicon/motif, do not redraw

## Art direction (distinct from Kim Logistics)
- **Cinema / photographic.** Full-bleed dark hero, logo as hero brand, blue signal glow
- Type: **Archivo** (display) + **Manrope** (body) + **Barlow Condensed** (eyebrows)
- Layout rhythm: left-anchored copy over photo, trust strip, photo+copy grids
- Footer credit: Dialedbase mark + wordmark linking to https://dialedbase.com

## Craft stack (Awwwards-class imports)
- `next` App Router + `next/font/google`
- `lenis` — inertia smooth scroll synced to GSAP ticker
- `gsap` + `@gsap/react` + ScrollTrigger — hero scrub, section reveals
- `motion` (`motion/react`) — magnetic CTAs / spring interactions
- Tailwind CSS v4

## Forbidden
- Sharing Kim’s Space Grotesk / IBM Plex / split light hero
- Purple gradients, cream/terracotta AI look, white boxes behind logos, inventing a new mark

# Kim Logistics - design lock

Sacred logos:
- `public/images/logo-wordmark.png` (source chalk / white wordmark)
- `public/images/logo-wordmark-chalk.png` (white marks for dark surfaces)
- `public/images/logo-wordmark-ink.png` (near-black marks for light surfaces)

Rules:
- Light KIM + bold LOGISTICS, tagline KEEP IT MOVING
- House outline + four diagonal motion hashes on the baseline
- Chalk on dark. Ink on light. Never `filter: invert` on the logo.
- Palette: black / white high contrast. Signal accent `#ff6b1a` (`--signal`) only.
- Logo placement: sticky header + footer chalk wordmark once. Never repeat BrandLogo in HeroStage or interior PageHero.
- Header: dark glass over hero, solid ink or paper after scroll. Pairs with the correct logo variant (no CSS invert).
- Craft bar: premium Coventry operator. Geometric / industrial. Controlled negative space. Full-bleed photo hero with motion hashes — not a blue cinematic twin of Move It Dan.
- Type: Space Grotesk (display) + IBM Plex Sans (body). Not Inter / Roboto / Arial.
- Motion stack: Lenis + GSAP ScrollTrigger reveals (autoAlpha, clearProps) + `motion/react` FadeIn / Stagger / Magnetic
- Surfaces: `.glass-lite` on dark-band secondary CTAs only
- Forbidden: new logo, purple gradients, Wix teal clutter, cream/terracotta AI look, keyword-spam copy, frosted white sticky headers that fight the brand, fake reviews

# Per-Page SEO Meta Tags Templates

## How to Implement (Choose One Method)

### Option 1: React Helmet (Recommended for React Sites)
```bash
npm install react-helmet-async
```

Then in each page component:
```jsx
import { Helmet } from 'react-helmet-async';

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Dialedbase — Websites, Apps & AI Systems | Design & Tech Studio</title>
        <meta name="description" content="..." />
        <meta property="og:title" content="..." />
        {/* other meta tags */}
      </Helmet>
      {/* page content */}
    </>
  );
}
```

### Option 2: Manual Meta Tags (Current Setup)
All main tags are in `/frontend/public/index.html`
- Pros: Simple, all in one place
- Cons: Same tags for all pages

### Option 3: Dynamic Route-Based (Advanced)
Create a utility function that updates meta tags based on the current route.

---

## HOME PAGE (/)

```html
<title>Dialedbase — Websites, Apps & AI Systems | Design & Tech Studio</title>
<meta name="description" content="Founder-led design & technology studio in Marbella & London. We build high-end websites, apps, and AI systems for ambitious brands. Web design, app development, AI integration, brand strategy.">
<meta property="og:title" content="Dialedbase — Websites, Apps & AI Systems | Design & Tech Studio">
<meta property="og:description" content="Premium digital design and technology studio. Websites, apps, AI systems for luxury brands, SaaS, startups.">
<meta property="og:url" content="https://dialedbase.com/">
<meta name="twitter:title" content="Dialedbase — Web Design, App Dev & AI Systems">
<meta name="twitter:description" content="Founder-led studio building high-end digital experiences for ambitious brands.">

<!-- Keywords for this page -->
Keywords: web design studio, app development, AI systems, design agency, web development, technology studio, founder-led agency, luxury web design
```

---

## ABOUT PAGE (/about)

```html
<title>About Dialedbase — Founder-Led Design & Technology Studio</title>
<meta name="description" content="Meet Dialedbase. A founder-led design & technology studio in Marbella & London. Meet Rhys Evans, designer & engineer leading every project. 6+ years, 40+ clients, AI-native products.">
<meta property="og:title" content="About Dialedbase — Meet Our Founder-Led Team">
<meta property="og:description" content="Learn about our founder-led approach, team expertise, and philosophy for building ambitious digital products.">
<meta property="og:url" content="https://dialedbase.com/about">
<meta name="twitter:title" content="About Dialedbase Studio">
<meta name="twitter:description" content="Founder-led design studio. Meet Rhys Evans and our approach to building exceptional digital products.">

<!-- Keywords for this page -->
Keywords: about us, founder-led agency, design team, studio philosophy, web design team, who we are, our team, Rhys Evans
```

---

## WORK / PORTFOLIO PAGE (/work)

```html
<title>Portfolio & Projects | Dialedbase Design Studio</title>
<meta name="description" content="See our portfolio of high-end web design, app development, and AI system projects. Client work across luxury, SaaS, hospitality, and AI industries. Heave Corp, Kinimatic, Essentia, and more.">
<meta property="og:title" content="Our Work — Dialedbase Portfolio & Case Studies">
<meta property="og:description" content="Explore our portfolio. High-end websites, apps, and AI systems for ambitious brands. Beautiful design meets powerful engineering.">
<meta property="og:url" content="https://dialedbase.com/work">
<meta name="twitter:title" content="Dialedbase Portfolio">
<meta name="twitter:description" content="See our latest web design, app development, and AI projects. Beautiful, high-performing digital experiences.">

<!-- Keywords for this page -->
Keywords: portfolio, case studies, web design portfolio, app portfolio, past projects, our work, design agency portfolio, client work
```

---

## Individual Project Pages (If Added)

```html
<!-- Example: Heave Corp Project -->
<title>Heave Corp Website & Brand System | Dialedbase Design Studio</title>
<meta name="description" content="Case study: How we designed and built Heave Corp's website with custom brand system, motion design, and high-performance engineering. Results: [metrics if available].">
<meta property="og:title" content="Heave Corp Website & Brand System Design">
<meta property="og:description" content="See how we built a stunning website and complete brand system for Heave Corp. Web design + motion + brand strategy.">
<meta property="og:image" content="[project-image-url]">
<meta name="twitter:title" content="Heave Corp Web Design Project">
<meta name="twitter:description" content="Award-winning website design project for Heave Corp by Dialedbase.">

<!-- Keywords for this page -->
Keywords: Heave Corp, web design project, brand system, case study, website redesign
```

---

## Best Practices for Meta Tags

### Title Tag Rules
- ✅ Include main keyword at the start
- ✅ Keep under 60 characters for desktop (70 for mobile)
- ✅ Include brand name (Dialedbase)
- ✅ Make it compelling and clickable
- ❌ Don't keyword stuff
- ❌ Don't exceed 60 characters

**Formula:** `[Keyword] | [Unique Value] | Dialedbase`

Examples:
- ✅ "Web Design Studio | Marbella & London | Dialedbase"
- ✅ "App Development | AI Integration | Design Studio"
- ❌ "Web Design Web Development Design Studio Marbella London Dialedbase"

### Meta Description Rules
- ✅ 150-160 characters for best display
- ✅ Include main keyword naturally
- ✅ Include a benefit or unique value
- ✅ Include CTA if relevant ("See our portfolio," "Book a call")
- ✅ Match the actual page content
- ❌ Don't keyword stuff
- ❌ Exceed 160 characters
- ❌ Make false claims

**Formula:** `[What you offer] + [Who benefits] + [Key benefit/difference]`

Example:
- ✅ "Founder-led design studio building high-end websites and AI systems. Based in Marbella & London, serving ambitious brands worldwide."
- ❌ "Web design studio web development app development AI systems design agency Marbella London"

---

## Structured Data Templates

### FAQ Schema (Add to About Page)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "@id": "https://dialedbase.com/about#faq1",
      "name": "How long do projects take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most projects take 2-6 months depending on scope."
      }
    },
    {
      "@type": "Question",
      "@id": "https://dialedbase.com/about#faq2",
      "name": "What's your process?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We start with discovery, then design, development, testing, and launch."
      }
    }
  ]
}
```

### Product/Service Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Web Development",
  "description": "Hand-crafted marketing sites, brand experiences and motion-driven landing pages.",
  "provider": {
    "@type": "Organization",
    "name": "Dialedbase"
  },
  "areaServed": ["GB", "ES", "US", "CA", "AU"],
  "serviceType": "Web Development"
}
```

### BreadcrumbList Schema (for navigation)
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://dialedbase.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "About",
      "item": "https://dialedbase.com/about"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Work",
      "item": "https://dialedbase.com/work"
    }
  ]
}
```

---

## What NOT to Do (Common SEO Mistakes)

❌ **Keyword Stuffing**
- Using keywords unnaturally ("web design web design web design")
- Writing for search engines instead of humans
- Hiding text with same color as background

❌ **Meta Tag Mistakes**
- Duplicate title tags across pages
- Meta descriptions over 160 characters
- Clickbait titles that don't match content
- Same description for every page

❌ **Technical Mistakes**
- No mobile optimization
- Slow page load times
- Broken internal links
- Using multiple H1 tags per page
- Poor image optimization (no alt text)

❌ **Content Mistakes**
- Thin content (less than 300 words)
- Copied content from competitors
- Not updating old content
- Poor grammar and spelling
- No internal linking strategy

---

## Monitoring & Testing

### Google PageSpeed Insights
https://pagespeed.web.dev/
- Test each page
- Fix "High Priority" issues
- Aim for 90+ score

### Google Mobile-Friendly Test
https://search.google.com/test/mobile-friendly
- Ensure all pages pass
- Check touch targets are large enough

### Schema Validator
https://schema.org/validator/
- Validate JSON-LD implementations
- Fix any validation errors

### OpenGraph Preview
https://www.opengraph.xyz/
- Preview how pages look on social media
- Ensure images display correctly

---

## Questions?

- Refer to `SEO_IMPLEMENTATION_ROADMAP.md` for full strategy
- Check `SEO_GUIDE.md` for maintenance tips
- Test everything in Search Console before launching

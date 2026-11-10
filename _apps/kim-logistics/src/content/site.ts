/**
 * CMS-friendly site content for Kim Logistics.
 * Swap this module for a headless CMS later without rewriting page layouts.
 */

export const brand = {
  name: "Kim Logistics",
  compactName: "KIMLOGISTICS",
  shortName: "Kim",
  motto: "Keep It Moving",
  tagline: "Removals done properly across Coventry and the West Midlands.",
  description:
    "Local removals company based in Coventry. Home moves, office relocations, packing, man and van, long-distance work, and trusted storage partners.",
  url: "https://www.kimlogistics.co.uk",
} as const;

export const contact = {
  phoneDisplay: "02477 360236",
  phoneHref: "tel:+442477360236",
  mobileDisplay: "07596 032301",
  mobileHref: "tel:+447596032301",
  email: "info@kimlogistics.co.uk",
  emailHref: "mailto:info@kimlogistics.co.uk",
  facebook: "https://www.facebook.com/kimlogistics",
  hours: [
    { label: "Mon to Fri", value: "8am to 8pm" },
    { label: "Saturday", value: "9am to 6pm" },
    { label: "Sunday", value: "9am to 6pm" },
  ],
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/areas", label: "Areas" },
  { href: "/faq", label: "FAQ" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
] as const;

export const services = [
  {
    id: "home",
    title: "Home removals",
    summary:
      "House moves for families, individuals, and students, handled with care from first box to final unload.",
    detail:
      "We plan access, protect floors and doorways, and keep the day calm. Partial or full packing available so you can focus on the keys.",
  },
  {
    id: "office",
    title: "Office removals",
    summary:
      "Business relocations with clear timelines and minimal downtime for your team.",
    detail:
      "Desks, IT, archives, and fit-out pieces moved in coordinated windows so you can reopen without chaos.",
  },
  {
    id: "packing",
    title: "Packing and unpacking",
    summary:
      "Full or partial packing with quality materials, ready for a smoother moving day.",
    detail:
      "We pack fragile items properly, label clearly, and can unpack at the other end if you want a clean handover.",
  },
  {
    id: "man-and-van",
    title: "Man and van",
    summary:
      "Right-sized help for smaller moves, single items, or tight schedules.",
    detail:
      "Ideal when you do not need a full crew. Straightforward pricing once we know the load and route.",
  },
  {
    id: "long-distance",
    title: "Long-distance removals",
    summary:
      "Moves beyond Coventry, planned with realistic timings and careful loading.",
    detail:
      "From West Midlands runs to further afield, we keep communication clear so you know where the van is and when it arrives.",
  },
  {
    id: "storage",
    title: "Storage partners",
    summary:
      "Secure storage introductions through local and national facilities we work with regularly.",
    detail:
      "Useful for chain gaps, renovations, or downsizing. We help you find a sensible rate and handle the load-in.",
  },
] as const;

export const areas = {
  hub: "Coventry",
  intro:
    "We are a Coventry-based crew covering the city and nearby towns across the West Midlands. If your move starts or ends nearby, ask us.",
  places: [
    "Coventry",
    "Leamington Spa",
    "Warwick",
    "Kenilworth",
    "Rugby",
    "Nuneaton",
    "Bedworth",
    "Solihull",
    "Birmingham",
    "Stratford-upon-Avon",
  ],
} as const;

/** Why-choose lines from the live Kim Logistics homepage. */
export const whyUs = [
  {
    title: "Local experts",
    body: "Local experts in Coventry removals.",
  },
  {
    title: "Insured and licensed",
    body: "Fully insured and licensed.",
  },
  {
    title: "A proper team",
    body: "Friendly, professional, and experienced.",
  },
  {
    title: "Clear pricing",
    body: "Competitive pricing with no hidden fees.",
  },
  {
    title: "Free quotes",
    body: "Free, no-obligation quotes.",
  },
] as const;

export const process = [
  { step: "01", title: "Planning" },
  { step: "02", title: "Packing" },
  { step: "03", title: "Moving" },
  { step: "04", title: "Unpacking" },
] as const;

export const about = {
  family:
    "We are a family run removals company in Coventry and we offer our services to the West Midlands region.",
  mission:
    "It is our mission to go above and beyond for our customers and take the stress out of the moving process.",
  team: "We have a reliable team of professional removal experts with many years of experience.",
  guarantee:
    "It is our promise that moving with us means no cutting corners, no hidden charges, and no unpleasant surprises.",
} as const;

/** Existing testimonial from the live site. Do not invent additional reviews. */
export const reviews = [
  {
    id: "tommy-hyde",
    name: "Tommy Hyde",
    place: "Coventry",
    quote:
      "Huge thanks to Adam and the team for making our house move super easy and stress-free. They were on time, super friendly, and took great care of everything. Couldn't have asked for a better experience - highly recommend!",
    sourceNote: "Existing testimonial from kimlogistics.co.uk",
  },
] as const;

export const faqs = [
  {
    id: "cost",
    question: "How much do removals cost in Coventry?",
    answer:
      "On the current Kim Logistics site, typical Coventry removal costs are described as ranging from £400 to £1,500 depending on property size and requirements. As a guide, 1-bedroom moves are listed from about £400 to £500, while 4-bedroom properties may sit around £900 to £1,500. Distance, access, packing, and extras change the figure. Treat these as guidance only. Every job is subject to a tailored quote.",
  },
  {
    id: "cheapest-day",
    question: "What is usually the better-value day to move?",
    answer:
      "Midweek moves, especially Tuesday to Thursday, are often more available and cost-effective than weekends or month-end peaks. Booking early helps lock a weekday slot.",
  },
  {
    id: "booking",
    question: "How far ahead should I book?",
    answer:
      "Aim for 2 to 4 weeks where you can, especially in summer or around month-end. Short-notice jobs are sometimes possible. Call and we will be straight with you.",
  },
  {
    id: "packing",
    question: "Do you pack as well as move?",
    answer:
      "Yes. Full packing, partial packing, or unpacking at the destination. Materials and labour are scoped in your quote so you know the cost before moving day.",
  },
  {
    id: "storage",
    question: "Can you help with storage?",
    answer:
      "We work with local and national storage partners and can help you secure a sensible rate, then move you in and out when dates line up.",
  },
] as const;

export const homeCopy = {
  heroKicker: "Keep it moving",
  heroHeadline: "A calm way to move",
  heroSupport:
    "An accessible path to a careful Coventry move. Home, office, packing, man and van, long-distance work, and storage partners. No deposit jargon. Just a clear quote and a crew that shows up.",
  servicesIntro:
    "No two moves are the same. Services are tailored to the job, from a local relocation to a full load.",
  areasIntro:
    "Serving Coventry and surrounding areas: Leamington Spa, Rugby, Nuneaton, Kenilworth, Bedworth, and more.",
  reviewIntro: "Tommy Hyde, Coventry",
  ctaTitle: "Register interest",
  ctaSupport:
    "Tell us where you are moving from and to. Free, no-obligation quote. We always aim to respond as fast as possible.",
} as const;

export const site = {
  name: "Move It Dan",
  tagline: "Moving made easy",
  phoneDisplay: "07502 346549",
  phoneTel: "+447502346549",
  email: "", // add when client confirms
  domain: "moveitdan.co.uk",
  summary:
    "Fully insured house and commercial moves across the UK and overseas, with careful packing and clear communication from quote to unload.",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/coverage", label: "Coverage" },
  { href: "/faq", label: "FAQ" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
] as const;

export const trustPoints = [
  "Fully insured",
  "Domestic and commercial moves",
  "Full packing option",
  "UK-wide coverage",
  "Overseas moves",
] as const;

export const services = [
  {
    slug: "domestic",
    title: "Domestic moves",
    blurb:
      "Flat, house, or whole-home moves handled with protective wraps, floor runners, and a calm crew who treat your belongings as their own.",
    details: [
      "Room-by-room loading plans",
      "Furniture dismantle and reassemble when needed",
      "Stair, carpet, and floor protection",
    ],
  },
  {
    slug: "commercial",
    title: "Commercial moves",
    blurb:
      "Office and business moves planned around your hours so downtime stays short and kit arrives labelled and ready.",
    details: [
      "Desks, IT, and storage runs",
      "Clear labelling and load order",
      "Flexible start windows where possible",
    ],
  },
  {
    slug: "packing",
    title: "Packing",
    blurb:
      "Full packing or fragile-only help, using quilted covers, wardrobe boxes, and the right wrap for TVs and glass.",
    details: [
      "Premium quilted covers for soft furnishings",
      "Wardrobe boxes so clothes stay on hangers",
      "Bubble wrap and specialised covers for fragiles",
    ],
  },
  {
    slug: "overseas",
    title: "Overseas moves",
    blurb:
      "International moves coordinated with care, so distance does not mean guesswork on protection or timing.",
    details: [
      "UK collection with export-ready packing",
      "Clear updates while goods are in transit",
      "Quote scoped to your destinations and volume",
    ],
  },
] as const;

export const coverage = {
  uk: {
    title: "Full UK coverage",
    body: "Local street moves and long-haul runs coast to coast. No move is too far within the UK.",
  },
  overseas: {
    title: "Overseas moves",
    body: "International removals with the same protection standards you get on a domestic job.",
  },
} as const;

export const faqs = [
  {
    question: "Do you dismantle and reassemble furniture?",
    answer:
      "Yes. We can safely dismantle furniture when needed and put it back up in your new home.",
  },
  {
    question: "What protective equipment do you use?",
    answer:
      "We use premium quilted covers for sofas, chairs, and mattresses, plus TV covers and bubble wrap for other goods. In your home we use protective stair runners and carpet or floor protection. For clothes we use wardrobe boxes so garments can stay on hangers and go away crease-free.",
  },
  {
    question: "Can you move me anywhere in the UK?",
    answer:
      "Yes. We cover the whole of the UK, along with international moves.",
  },
  {
    question: "Do you offer packing?",
    answer:
      "Yes. We offer a range of services including a full packing option. Ask for packing when you request a quote so we can size materials and time correctly.",
  },
  {
    question: "Are you insured?",
    answer:
      "Yes. Moves are fully insured. Ask on your quote call if you need the certificate details for your records.",
  },
] as const;

/** Replace with real review text only after client permission. */
export const reviewPlaceholders = [
  {
    id: "r1",
    label: "Review slot 1",
    note: "Paste approved customer quote here",
  },
  {
    id: "r2",
    label: "Review slot 2",
    note: "Paste approved customer quote here",
  },
  {
    id: "r3",
    label: "Review slot 3",
    note: "Paste approved customer quote here",
  },
] as const;

export const photoSlots = [
  {
    id: "hero",
    label: "Client photo needed: loaded van or crew at a home",
    hint: "Landscape, bright, real Move It Dan van preferred",
  },
  {
    id: "care",
    label: "Client photo needed: furniture wrapping / protection in progress",
    hint: "Close detail of quilted covers or floor runners",
  },
  {
    id: "crew",
    label: "Client photo needed: team or Dan on a job",
    hint: "Natural light, faces optional with permission",
  },
  {
    id: "unload",
    label: "Client photo needed: unload or new-home arrival",
    hint: "Shows the finish, not only the truck",
  },
] as const;

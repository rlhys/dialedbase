import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { LabeledImage } from "@/components/LabeledImage";
import { Reveal } from "@/components/Reveal";
import { faqs, services, site, trustPoints } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden bg-ink text-chalk">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src="/placeholders/asset-6.jpg"
            alt=""
            fill
            priority
            className="object-cover object-[center_35%] scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(7,16,24,0.9)_0%,rgba(12,22,36,0.72)_46%,rgba(12,22,36,0.48)_100%)]" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 70% 55% at 78% 42%, color-mix(in srgb, var(--signal) 22%, transparent), transparent 58%)",
            }}
          />
        </div>

        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:justify-center">
          <div className="max-w-2xl">
            <p className="display hero-rise text-[clamp(3rem,10vw,6.2rem)] leading-[0.9] tracking-[-0.04em]">
              {site.name}
            </p>
            <h1 className="hero-rise hero-rise-delay-1 mt-5 text-2xl font-medium tracking-tight text-white/95 sm:text-3xl">
              {site.tagline}
            </h1>
            <p className="hero-rise hero-rise-delay-2 mt-4 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
              Careful domestic and commercial moves across the UK and overseas,
              with packing support and clear updates from quote to unload.
            </p>
            <div className="hero-rise hero-rise-delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="cta-pulse inline-flex items-center justify-center rounded-md bg-signal px-5 py-3.5 text-sm font-semibold text-chalk no-underline hover:bg-signal-deep"
              >
                Get a free quote
              </Link>
              <a
                href={`tel:${site.phoneTel}`}
                className="inline-flex items-center justify-center rounded-md border border-white/25 px-5 py-3.5 text-sm font-semibold text-chalk no-underline hover:bg-white/5"
              >
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-chalk/70">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-x-8 gap-y-3 px-5 py-5 text-sm text-ink-soft sm:px-8">
          {trustPoints.map((point) => (
            <span key={point} className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
              {point}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <p className="condensed text-[0.72rem] text-signal-deep">Why us</p>
          <h2 className="display mt-3 max-w-2xl text-3xl leading-tight sm:text-4xl">
            Moving with care, not chaos
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel sm:text-lg">
            We treat your goods as if they were our own. Your home matters, so
            we use proper protection for furniture, fragiles, floors, and stairs.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <LabeledImage
              src="/placeholders/asset-4.jpg"
              alt="Sofas wrapped in quilted protective covers during a Move It Dan job"
              label="Client photo: quilted sofa covers on a domestic move"
              className="min-h-[20rem] aspect-[4/5] lg:aspect-auto lg:min-h-[24rem]"
            />
          </Reveal>
          <Reveal className="flex flex-col justify-center gap-6">
            <div>
              <h3 className="display text-2xl">Reliable and experienced</h3>
              <p className="mt-3 text-steel leading-relaxed">
                Built on careful jobs and straight communication until the move
                is done. Ask for recent references when you get in touch.
              </p>
            </div>
            <div>
              <h3 className="display text-2xl">Protection that shows</h3>
              <p className="mt-3 text-steel leading-relaxed">
                Quilted covers, TV wraps, stair runners, and wardrobe boxes so
                clothes stay on hangers and rooms stay protected.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist/60 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <p className="condensed text-[0.72rem] text-signal-deep">Services</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">
              What we can handle
            </h2>
            <p className="mt-4 max-w-xl text-steel">
              Domestic, commercial, packing, and overseas. One team, clear
              quotes, hard CTAs when you are ready.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {services.map((service) => (
              <Reveal key={service.slug} as="article">
                <p className="condensed text-[0.68rem] text-steel">
                  {service.slug}
                </p>
                <h3 className="display mt-2 text-2xl">{service.title}</h3>
                <p className="mt-3 text-steel leading-relaxed">{service.blurb}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <Link
              href="/services"
              className="text-sm font-semibold text-ink underline-offset-4 hover:underline"
            >
              See full services
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <p className="condensed text-[0.72rem] text-signal-deep">Coverage</p>
          <h2 className="display mt-3 text-3xl sm:text-4xl">
            UK-wide and overseas
          </h2>
          <p className="mt-4 text-steel leading-relaxed">
            Local street moves, long UK hauls, and international removals. If
            you can name the destination, ask for a quote.
          </p>
          <Link
            href="/coverage"
            className="mt-6 inline-flex text-sm font-semibold text-ink underline-offset-4 hover:underline"
          >
            View coverage
          </Link>
        </Reveal>
        <Reveal>
          <LabeledImage
            src="/placeholders/asset-5.jpg"
            alt="Move It Dan vans parked outside a UK home"
            label="Client photo: branded van on a residential job"
            className="min-h-[28rem]"
            imageClassName="object-cover object-center"
          />
        </Reveal>
      </section>

      <section className="border-y border-line bg-chalk py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <p className="condensed text-[0.72rem] text-signal-deep">FAQ</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">
              Quick answers
            </h2>
          </Reveal>
          <div className="mt-10 divide-y divide-line">
            {faqs.slice(0, 3).map((faq) => (
              <Reveal key={faq.question} className="py-6">
                <h3 className="text-lg font-semibold tracking-tight">
                  {faq.question}
                </h3>
                <p className="mt-2 max-w-3xl text-steel leading-relaxed">
                  {faq.answer}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-4">
            <Link
              href="/faq"
              className="text-sm font-semibold text-ink underline-offset-4 hover:underline"
            >
              Read all FAQs
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <p className="condensed text-[0.72rem] text-signal-deep">Reviews</p>
          <h2 className="display mt-3 text-3xl sm:text-4xl">
            Customer words, when approved
          </h2>
          <p className="mt-4 max-w-2xl text-steel leading-relaxed">
            This rebuild does not invent star ratings or fake testimonials.
            Approved review text and permissions go here next.
          </p>
          <Link
            href="/reviews"
            className="mt-6 inline-flex text-sm font-semibold text-ink underline-offset-4 hover:underline"
          >
            See review structure
          </Link>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { HeroStage } from "@/components/HeroStage";
import { FadeIn, Magnetic, Stagger, StaggerItem, Tilt } from "@/components/Motion";
import { faqs, services, trustPoints } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <HeroStage />

      <section className="border-y border-line bg-chalk">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-x-8 gap-y-3 px-5 py-5 text-sm text-ink-soft sm:px-8">
          {trustPoints.map((point) => (
            <span key={point} className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
              {point}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <FadeIn>
          <p className="eyebrow">Why us</p>
          <h2 className="display mt-3 max-w-2xl text-3xl leading-tight sm:text-5xl">
            Moving with care,{" "}
            <span className="text-signal">not chaos</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-steel sm:text-lg">
            We treat your goods as if they were our own. Proper protection for
            furniture, fragiles, floors, and stairs.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <Tilt className="relative min-h-[22rem] overflow-hidden rounded-3xl bg-mist sm:min-h-[28rem]">
              <Image
                src="/placeholders/asset-4.jpg"
                alt="Sofas wrapped in quilted protective covers during a Move It Dan job"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </Tilt>
          </FadeIn>
          <Stagger gap={0.12} className="space-y-8">
            <StaggerItem>
              <h3 className="display text-2xl sm:text-3xl">Reliable and experienced</h3>
              <p className="mt-3 leading-relaxed text-steel">
                Built on careful jobs and clear communication until the move is
                done. Ask for recent references when you get in touch.
              </p>
            </StaggerItem>
            <StaggerItem>
              <h3 className="display text-2xl sm:text-3xl">Protection that shows</h3>
              <p className="mt-3 leading-relaxed text-steel">
                Quilted covers, TV wraps, stair runners, and wardrobe boxes so
                clothes stay on hangers and rooms stay protected.
              </p>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
        <div className="hidden pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <FadeIn>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-signal">
              Services
            </p>
            <h2 className="display mt-3 text-3xl sm:text-5xl">
              <span className="text-inherit">What we can handle</span>
            </h2>
            <p className="mt-4 max-w-xl text-white/65">
              Domestic, commercial, packing, and overseas. One team, clear quotes.
            </p>
          </FadeIn>
          <Stagger gap={0.08} className="mt-12 grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <StaggerItem key={service.slug}>
                <article className="border border-white/25 bg-black/45 h-full rounded-2xl p-6 transition hover:border-white/20">
                  <h3 className="display text-xl text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    {service.blurb}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn delay={0.15} className="mt-8">
            <Link
              href="/services"
              className="text-sm font-semibold text-signal no-underline hover:underline"
            >
              See full services →
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:items-center">
        <FadeIn>
          <p className="eyebrow">Coverage</p>
          <h2 className="display mt-3 text-3xl sm:text-5xl">UK-wide and overseas</h2>
          <p className="mt-4 leading-relaxed text-steel">
            Local street moves, long UK hauls, and international removals. If you
            can name the destination, ask for a quote.
          </p>
          <Magnetic className="mt-8 inline-flex">
            <Link
              href="/coverage"
              className="inline-flex items-center gap-2 rounded-full bg-ink py-1.5 pl-5 pr-1.5 text-sm font-semibold text-white no-underline"
            >
              View coverage
              <span className="grid h-8 w-8 place-items-center rounded-full bg-signal">→</span>
            </Link>
          </Magnetic>
        </FadeIn>
        <FadeIn delay={0.1}>
          <Tilt className="relative min-h-[22rem] overflow-hidden rounded-3xl bg-mist">
            <Image
              src="/placeholders/asset-5.jpg"
              alt="Move It Dan vans parked outside a UK home"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Tilt>
        </FadeIn>
      </section>

      <section className="border-y border-line bg-chalk py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <FadeIn>
            <p className="eyebrow">FAQ</p>
            <h2 className="display mt-3 text-3xl sm:text-5xl">Quick answers</h2>
          </FadeIn>
          <Stagger gap={0.07} className="mt-10 divide-y divide-line">
            {faqs.slice(0, 3).map((faq) => (
              <StaggerItem key={faq.question} className="py-6">
                <h3 className="text-lg font-semibold tracking-tight">{faq.question}</h3>
                <p className="mt-2 max-w-3xl leading-relaxed text-steel">{faq.answer}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn className="mt-4">
            <Link
              href="/faq"
              className="text-sm font-semibold text-signal no-underline hover:underline"
            >
              Read all FAQs →
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <FadeIn>
          <p className="eyebrow">Reviews</p>
          <h2 className="display mt-3 text-3xl sm:text-5xl">
            Customer words, when approved
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-steel">
            This rebuild does not invent star ratings or fake testimonials.
            Approved review text goes here next.
          </p>
          <Link
            href="/reviews"
            className="mt-6 inline-flex text-sm font-semibold text-signal no-underline hover:underline"
          >
            See review structure →
          </Link>
        </FadeIn>
      </section>

      <CtaBand />
    </>
  );
}

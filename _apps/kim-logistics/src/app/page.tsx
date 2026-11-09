import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { HeroStage } from "@/components/HeroStage";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import {
  areas,
  homeCopy,
  reviews,
  services,
  whyUs,
} from "@/content/site";

export default function HomePage() {
  const review = reviews[0];

  return (
    <>
      <HeroStage />

      <section className="site-shell atmosphere py-16 md:py-24">
        <Reveal>
          <SectionHeading
            eyebrow="Why Kim Logistics"
            title="A local operator built for calm moving days."
            support="Friendly crews, clear communication, and careful handling from quote to unload."
          />
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {whyUs.map((item, index) => (
            <Reveal key={item.title} className="border-t border-ink/15 pt-5" as="article">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-moss">
                0{index + 1}
              </p>
              <h3 className="font-display mt-3 text-2xl tracking-tight text-ink">{item.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-steel">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-field/70">
        <div className="site-shell py-16 md:py-24">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <SectionHeading eyebrow="Services" title="What we move" support={homeCopy.servicesIntro} />
            </Reveal>
            <Reveal>
              <Link
                href="/services"
                className="inline-flex font-semibold text-ink underline decoration-signal decoration-2 underline-offset-4"
              >
                View all services
              </Link>
            </Reveal>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Reveal
                key={service.id}
                as="article"
                className="group border border-ink/10 bg-paper/80 p-6 transition hover:border-signal/50"
              >
                <h3 className="font-display text-2xl tracking-tight text-ink">{service.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-steel">{service.summary}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="site-shell py-16 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Areas served"
              title={`Rooted in ${areas.hub}`}
              support={homeCopy.areasIntro}
            />
            <ul className="mt-8 flex flex-wrap gap-x-4 gap-y-3">
              {areas.places.map((place) => (
                <li key={place} className="text-lg font-medium text-ink">
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-signal align-middle" />
                  {place}
                </li>
              ))}
            </ul>
            <Link
              href="/areas"
              className="mt-8 inline-flex font-semibold text-ink underline decoration-signal decoration-2 underline-offset-4"
            >
              See coverage details
            </Link>
          </Reveal>
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-ink">
            <Image
              src="/images/fleet.jpg"
              alt="Kim Logistics fleet on a residential job"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-ink text-paper">
        <div className="site-shell py-16 md:py-24">
          <Reveal>
            <SectionHeading tone="dark" eyebrow="Reviews" title={homeCopy.reviewIntro} />
          </Reveal>
          <Reveal as="blockquote" className="mt-10 max-w-3xl">
            <p className="font-display text-2xl leading-snug tracking-tight sm:text-3xl md:text-4xl">
              “{review.quote}”
            </p>
            <footer className="mt-8 text-base text-paper/70">
              <cite className="not-italic font-semibold text-paper">{review.name}</cite>
              {" · "}
              {review.place}
            </footer>
          </Reveal>
          <Reveal className="mt-8">
            <Link
              href="/reviews"
              className="inline-flex font-semibold text-signal underline decoration-signal/40 underline-offset-4"
            >
              Read the review
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

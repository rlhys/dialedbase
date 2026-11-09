import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { HeroStage } from "@/components/HeroStage";
import { Reveal } from "@/components/Reveal";
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

      {/* Numbered manifesto strip — industrial, not photo-grid twin of MID */}
      <section className="border-b border-ink/10 bg-ink text-paper">
        <div className="site-shell grid gap-0 md:grid-cols-4">
          {whyUs.map((item, index) => (
            <Reveal
              key={item.title}
              as="article"
              className="border-paper/10 px-0 py-10 md:border-r md:px-6 md:py-14 last:md:border-r-0"
            >
              <p className="font-display text-4xl text-signal">{String(index + 1).padStart(2, "0")}</p>
              <h2 className="font-display mt-4 text-xl tracking-tight">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-paper/70">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="site-shell atmosphere py-16 md:py-24">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-signal">Services</p>
          <h2 className="font-display mt-3 max-w-2xl text-4xl tracking-tight md:text-5xl">
            What we move
          </h2>
          <p className="mt-4 max-w-xl text-lg text-steel">{homeCopy.servicesIntro}</p>
        </Reveal>
        <ul className="mt-12 divide-y divide-ink/15 border-y border-ink/15">
          {services.map((service) => (
            <Reveal key={service.id} as="li" className="group flex flex-col gap-2 py-7 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10">
              <h3 className="font-display text-2xl tracking-tight text-ink transition group-hover:text-signal sm:text-3xl">
                {service.title}
              </h3>
              <p className="max-w-md text-base leading-relaxed text-steel sm:text-right">
                {service.summary}
              </p>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-8">
          <Link
            href="/services"
            className="inline-flex font-semibold text-ink underline decoration-signal decoration-2 underline-offset-4"
          >
            View all services
          </Link>
        </Reveal>
      </section>

      <section className="bg-field-deep/50">
        <div className="site-shell grid items-stretch gap-0 lg:grid-cols-2">
          <Reveal className="relative min-h-[22rem] lg:min-h-[32rem]">
            <Image
              src="/images/fleet.jpg"
              alt="Kim Logistics fleet on a residential job"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </Reveal>
          <Reveal className="flex flex-col justify-center px-0 py-14 lg:px-12 lg:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-signal">Areas</p>
            <h2 className="font-display mt-3 text-4xl tracking-tight md:text-5xl">
              Rooted in {areas.hub}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-steel">{homeCopy.areasIntro}</p>
            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-2">
              {areas.places.map((place) => (
                <li key={place} className="font-display text-base text-ink">
                  {place}
                </li>
              ))}
            </ul>
            <Link
              href="/areas"
              className="mt-8 inline-flex w-fit font-semibold text-ink underline decoration-signal decoration-2 underline-offset-4"
            >
              See coverage details
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="site-shell py-16 md:py-24">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-signal">Reviews</p>
          <h2 className="font-display mt-3 max-w-3xl text-3xl tracking-tight md:text-4xl">
            {homeCopy.reviewIntro}
          </h2>
        </Reveal>
        <Reveal as="blockquote" className="mt-12 border-l-4 border-signal pl-6 md:pl-10">
          <p className="font-display text-2xl leading-snug tracking-tight sm:text-3xl md:text-[2.35rem]">
            “{review.quote}”
          </p>
          <footer className="mt-8 text-base text-steel">
            <cite className="not-italic font-semibold text-ink">{review.name}</cite>
            {" · "}
            {review.place}
          </footer>
        </Reveal>
        <Reveal className="mt-8">
          <Link
            href="/reviews"
            className="inline-flex font-semibold text-ink underline decoration-signal decoration-2 underline-offset-4"
          >
            Read the review
          </Link>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}

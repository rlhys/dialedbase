import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { HeroStage } from "@/components/HeroStage";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { areas, homeCopy, reviews, services, whyUs } from "@/content/site";

export default function HomePage() {
  const review = reviews[0];

  return (
    <>
      <HeroStage />

      <section className="bg-paper">
        <div className="site-shell py-20 md:py-28">
          <Reveal>
            <SectionHeading
              eyebrow="Why Kim Logistics"
              title="A local operator built for calm moving days."
              support="Friendly crews, clear communication, and careful handling from quote to unload."
            />
          </Reveal>
          <div className="mt-14 grid gap-0 border-t border-ink/15 md:grid-cols-2 xl:grid-cols-4">
            {whyUs.map((item, index) => (
              <Reveal
                key={item.title}
                className="border-b border-ink/15 px-0 py-8 md:border-b-0 md:border-r md:px-6 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
                as="article"
              >
                <p className="font-display text-sm font-semibold tracking-[0.18em] text-signal">
                  0{index + 1}
                </p>
                <h3 className="font-display mt-4 text-2xl tracking-[-0.02em] text-ink">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-mute">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper">
        <div className="site-shell py-20 md:py-28">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <SectionHeading
                tone="dark"
                eyebrow="Services"
                title="What we move"
                support={homeCopy.servicesIntro}
              />
            </Reveal>
            <Reveal>
              <Link
                href="/services"
                className="inline-flex font-semibold text-paper underline decoration-signal decoration-2 underline-offset-4 transition-colors hover:text-signal"
              >
                View all services
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-0 border-t border-paper/15 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Reveal
                key={service.id}
                as="article"
                className="border-b border-paper/15 p-6 transition-colors hover:bg-paper/[0.04] sm:odd:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0"
              >
                <h3 className="font-display text-2xl tracking-[-0.02em] text-paper">{service.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-paper/65">{service.summary}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-field">
        <div className="site-shell py-20 md:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <SectionHeading
                eyebrow="Areas served"
                title={`Rooted in ${areas.hub}`}
                support={homeCopy.areasIntro}
              />
              <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {areas.places.map((place) => (
                  <li
                    key={place}
                    className="flex items-center gap-3 border-b border-ink/10 pb-3 text-lg font-medium text-ink"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 bg-signal" />
                    {place}
                  </li>
                ))}
              </ul>
              <Link
                href="/areas"
                className="mt-10 inline-flex font-semibold text-ink underline decoration-signal decoration-2 underline-offset-4 transition-colors hover:text-signal"
              >
                See coverage details
              </Link>
            </Reveal>
            <Reveal className="relative aspect-[4/3] overflow-hidden bg-ink">
              <Image
                src="/images/job-1.jpeg"
                alt="Kim Logistics crew on a residential move"
                fill
                className="object-cover object-center transition-transform duration-500 hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper">
        <div className="site-shell py-20 md:py-28">
          <Reveal>
            <SectionHeading tone="dark" eyebrow="Reviews" title={homeCopy.reviewIntro} />
          </Reveal>
          <Reveal as="blockquote" className="mt-12 max-w-3xl">
            <p className="font-display text-2xl leading-snug tracking-[-0.02em] sm:text-3xl md:text-4xl">
              “{review.quote}”
            </p>
            <footer className="mt-8 text-base text-paper/65">
              <cite className="not-italic font-semibold text-paper">{review.name}</cite>
              {" · "}
              {review.place}
            </footer>
          </Reveal>
          <Reveal className="mt-8">
            <Link
              href="/reviews"
              className="inline-flex font-semibold text-signal underline decoration-signal/40 underline-offset-4 transition-colors hover:text-paper"
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

import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { HeroStage } from "@/components/HeroStage";
import { Reveal } from "@/components/Reveal";
import {
  about,
  areas,
  contact,
  faqs,
  homeCopy,
  process,
  reviews,
  services,
  whyUs,
} from "@/content/site";

export default function HomePage() {
  const review = reviews[0];

  return (
    <>
      <HeroStage />

      <section className="border-y border-[var(--line)]">
        <div className="site-shell-narrow py-20 text-center md:py-28">
          <Reveal>
            <p className="font-display text-3xl leading-snug tracking-[-0.03em] text-bark sm:text-4xl md:text-[2.75rem]">
              When it comes to moving, people usually feel stuck between two options.
            </p>
            <p className="font-display mt-10 text-4xl tracking-[-0.03em] text-bark-soft sm:text-5xl">
              rush it <span className="italic text-stone">or</span> overpay
            </p>
            <p className="font-display mt-12 text-3xl tracking-[-0.03em] text-bark sm:text-4xl">
              What if there was{" "}
              <span className="italic text-signal">another way?</span>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="site-shell">
          <Reveal>
            <p className="eyebrow">Meet Kim Logistics</p>
            <h2 className="font-display mt-4 max-w-3xl text-4xl tracking-[-0.03em] text-bark sm:text-5xl md:text-6xl">
              A family crew for Coventry moves.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone">
              {about.family} {about.mission}
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {whyUs.slice(0, 3).map((item, index) => (
              <Reveal
                key={item.title}
                as="article"
                className="rounded-[var(--radius-lg)] border border-[var(--line)] bg-chalk/70 p-6 md:p-7"
              >
                <p className="font-mono-ui text-[0.68rem] text-signal">0{index + 1}</p>
                <h3 className="font-display mt-4 text-3xl tracking-[-0.03em] text-bark">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-stone">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bark text-chalk">
        <div className="site-shell grid gap-10 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-24">
          <Reveal>
            <p className="eyebrow !text-sky">From quote to unload</p>
            <h2 className="font-display mt-4 text-4xl tracking-[-0.03em] sm:text-5xl">
              Step by step
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-chalk/70">
              {about.team}
            </p>
          </Reveal>
          <ol className="grid gap-3 sm:grid-cols-2">
            {process.map((item) => (
              <li
                key={item.step}
                className="rounded-[var(--radius-md)] border border-chalk/15 bg-chalk/[0.04] p-5"
              >
                <p className="font-mono-ui text-[0.68rem] text-sky">{item.step}</p>
                <p className="font-display mt-3 text-3xl tracking-[-0.03em]">{item.title}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="site-shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <p className="eyebrow">Services</p>
              <h2 className="font-display mt-3 max-w-xl text-4xl tracking-[-0.03em] text-bark sm:text-5xl">
                What we move
              </h2>
              <p className="mt-4 max-w-xl text-lg text-stone">{homeCopy.servicesIntro}</p>
            </Reveal>
            <Link
              href="/services"
              className="font-mono-ui text-[0.72rem] text-bark underline decoration-sky decoration-2 underline-offset-4"
            >
              See all services
            </Link>
          </div>

          <div className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {services.map((service) => (
              <Reveal
                key={service.id}
                as="article"
                className="grid gap-2 py-6 sm:grid-cols-[13rem_1fr] sm:gap-8"
              >
                <h3 className="font-display text-2xl tracking-[-0.02em] text-bark">
                  {service.title}
                </h3>
                <p className="leading-relaxed text-stone">{service.summary}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-8 md:pb-12">
        <div className="site-shell grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="dwell-frame relative min-h-[22rem] overflow-hidden">
            <Image
              src="/images/job-1.jpeg"
              alt="Kim Logistics packing boxes on a move"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
          <div className="flex flex-col justify-between gap-8 rounded-[var(--radius-lg)] bg-sky/35 p-7 md:p-9">
            <blockquote>
              <p className="font-display text-2xl leading-snug tracking-[-0.02em] text-bark sm:text-3xl">
                “{review.quote}”
              </p>
              <footer className="mt-6 text-stone">
                <cite className="not-italic font-semibold text-bark">{review.name}</cite>
                {" · "}
                {review.place}
              </footer>
            </blockquote>
            <p className="leading-relaxed text-bark-soft">{about.guarantee}</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="site-shell grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <p className="eyebrow">Areas</p>
            <h2 className="font-display mt-3 text-4xl tracking-[-0.03em] text-bark sm:text-5xl">
              Rooted in Coventry
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-stone">{homeCopy.areasIntro}</p>
            <p className="mt-6 text-bark">{areas.places.join(" · ")}</p>
            <Link
              href="/areas"
              className="font-mono-ui mt-6 inline-flex text-[0.72rem] underline decoration-sky decoration-2 underline-offset-4"
            >
              Coverage
            </Link>
          </Reveal>
          <div className="dwell-frame relative aspect-[5/4]">
            <Image
              src="/images/job-2.jpeg"
              alt="Kim Logistics crew with boxes at a property"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)] py-16 md:py-20">
        <div className="site-shell">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2 className="font-display mt-3 text-4xl tracking-[-0.03em] text-bark sm:text-5xl">
              How much do removals cost?
            </h2>
          </Reveal>
          <div className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {faqs.slice(0, 3).map((item) => (
              <Reveal key={item.id} as="article" className="py-6">
                <h3 className="font-display text-2xl tracking-[-0.02em] text-bark">
                  {item.question}
                </h3>
                <p className="mt-2 max-w-3xl leading-relaxed text-stone">{item.answer}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-stone">
            {contact.hours.map((row) => (
              <p key={row.label}>
                <span className="font-semibold text-bark">{row.label}</span> {row.value}
              </p>
            ))}
          </div>
          <Link
            href="/faq"
            className="font-mono-ui mt-6 inline-flex text-[0.72rem] underline decoration-sky decoration-2 underline-offset-4"
          >
            All questions
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { HeroStage } from "@/components/HeroStage";
import { about, areas, contact, faqs, homeCopy, process, reviews, services, whyUs } from "@/content/site";

export default function HomePage() {
  const review = reviews[0];

  return (
    <>
      <HeroStage />

      <section className="border-b border-[var(--line)] bg-field">
        <ol className="site-shell grid gap-6 py-8 sm:grid-cols-4">
          {process.map((item) => (
            <li key={item.step}>
              <p className="font-display text-sm font-bold tracking-[0.16em] text-signal">{item.step}</p>
              <p className="font-display mt-1 text-2xl text-ink">{item.title}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-paper">
        <div className="site-shell grid gap-12 py-16 md:py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="font-display text-4xl tracking-[-0.03em] text-ink">Our services</h2>
            <p className="mt-4 leading-relaxed text-mute">{homeCopy.servicesIntro}</p>
            <Link href="/services" className="mt-6 inline-flex font-semibold text-ink underline decoration-signal decoration-2 underline-offset-4">
              See services
            </Link>
          </div>
          <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {services.map((service) => (
              <article key={service.id} className="grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <h3 className="font-semibold text-ink">{service.title}</h3>
                <p className="text-mute">{service.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper">
        <div className="site-shell grid gap-10 py-16 md:grid-cols-2 md:py-20">
          <div>
            <h2 className="font-display text-4xl tracking-[-0.03em]">What sets us apart</h2>
            <p className="mt-4 max-w-md leading-relaxed text-paper/70">{about.team}</p>
          </div>
          <ul className="divide-y divide-paper/15 border-y border-paper/15">
            {whyUs.map((item) => (
              <li key={item.title} className="py-4 text-lg">
                {item.body}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper">
        <div className="site-shell grid gap-10 py-16 md:grid-cols-2 md:py-20">
          <blockquote className="border-l-8 border-signal pl-6">
            <p className="font-display text-2xl leading-snug tracking-[-0.02em] text-ink sm:text-3xl">
              “{review.quote}”
            </p>
            <footer className="mt-5 text-mute">
              <cite className="not-italic font-semibold text-ink">{review.name}</cite>
              {" · "}
              {review.place}
            </footer>
          </blockquote>
          <div>
            <h2 className="font-display text-3xl tracking-[-0.03em] text-ink">Our quality guarantee</h2>
            <p className="mt-4 leading-relaxed text-mute">{about.guarantee}</p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-mute">Working hours</p>
            <ul className="mt-3 space-y-1 text-ink">
              {contact.hours.map((row) => (
                <li key={row.label} className="flex justify-between gap-4 border-b border-[var(--line)] py-2">
                  <span>{row.label}</span>
                  <span>{row.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-field">
        <div className="site-shell py-10">
          <h2 className="font-display text-2xl text-ink">Areas</h2>
          <p className="mt-3 max-w-3xl text-lg text-ink">{homeCopy.areasIntro}</p>
          <p className="mt-4 text-mute">{areas.places.join(" · ")}</p>
          <Link href="/areas" className="mt-4 inline-flex font-semibold underline decoration-signal decoration-2 underline-offset-4">
            Coverage
          </Link>
        </div>
      </section>

      <section className="bg-paper">
        <div className="site-shell py-16 md:py-20">
          <h2 className="font-display text-4xl tracking-[-0.03em] text-ink">How much do removals cost?</h2>
          <div className="mt-8 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {faqs.slice(0, 3).map((item) => (
              <article key={item.id} className="py-6">
                <h3 className="font-display text-2xl text-ink">{item.question}</h3>
                <p className="mt-2 max-w-3xl leading-relaxed text-mute">{item.answer}</p>
              </article>
            ))}
          </div>
          <Link href="/faq" className="mt-6 inline-flex font-semibold underline decoration-signal decoration-2 underline-offset-4">
            All questions
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { HeroStage } from "@/components/HeroStage";
import { faqs, photos, pillars, services, trustPoints } from "@/content/site";

const gallery = [photos.care, photos.van, photos.crew, photos.unload];

export default function HomePage() {
  return (
    <>
      <HeroStage />

      <section className="border-b border-line bg-paper">
        <ul className="site-shell grid gap-3 py-5 sm:grid-cols-2 lg:grid-cols-5">
          {trustPoints.map((point) => (
            <li key={point} className="text-sm font-semibold text-ink">
              <span className="mr-2 inline-block h-2 w-2 bg-signal" aria-hidden />
              {point}
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-field">
        <div className="site-shell grid gap-10 py-16 md:grid-cols-3 md:py-20">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="border-t-4 border-signal bg-paper p-6">
              <h2 className="display text-3xl text-ink">{pillar.title}</h2>
              <p className="mt-3 leading-relaxed text-steel">{pillar.body}</p>
            </article>
          ))}
          <article className="border-t-4 border-signal bg-paper p-6">
            <h2 className="display text-3xl text-ink">Why choose us?</h2>
            <ul className="mt-3 space-y-2 text-steel">
              {trustPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="bg-paper">
        <div className="site-shell py-16 md:py-20">
          <div className="flex items-end justify-between gap-6">
            <h2 className="display text-4xl text-ink sm:text-5xl">What we can handle</h2>
            <Link href="/services" className="link-quiet hidden sm:inline">
              All services
            </Link>
          </div>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {services.map((service) => (
              <article key={service.slug} className="grid gap-2 py-6 sm:grid-cols-[12rem_1fr] sm:gap-8">
                <h3 className="display text-2xl text-ink">{service.title}</h3>
                <p className="leading-relaxed text-steel">{service.blurb}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink">
        <div className="site-shell grid gap-3 py-3 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((photo) => (
            <figure key={photo.src} className="relative aspect-square overflow-hidden bg-ink-soft">
              <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="25vw" />
            </figure>
          ))}
        </div>
      </section>

      <section className="bg-paper">
        <div className="site-shell py-16 md:py-20">
          <h2 className="display text-4xl text-ink sm:text-5xl">Questions</h2>
          <p className="mt-3 max-w-xl text-steel">
            If you cannot find an answer, get in touch and we will talk it through.
          </p>
          <div className="mt-8 divide-y divide-line border-y border-line">
            {faqs.slice(0, 3).map((item) => (
              <article key={item.question} className="py-6">
                <h3 className="display text-2xl text-ink">{item.question}</h3>
                <p className="mt-2 max-w-3xl leading-relaxed text-steel">{item.answer}</p>
              </article>
            ))}
          </div>
          <Link href="/faq" className="link-quiet mt-6 inline-flex">
            Read all FAQs
          </Link>
        </div>
      </section>

      <CtaBand
        title="Get a quote for your move"
        body="Call, WhatsApp, or send the form with your current address, new address, date, and how many rooms."
      />
    </>
  );
}

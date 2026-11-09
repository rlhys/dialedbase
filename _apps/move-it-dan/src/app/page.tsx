import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { HeroStage } from "@/components/HeroStage";
import { Motif } from "@/components/Motif";
import { Reveal } from "@/components/Reveal";
import { faqs, services, trustPoints } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <HeroStage />

      <section className="bg-black text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-8 gap-y-3 px-5 py-5 sm:px-8">
          {trustPoints.map((point) => (
            <span
              key={point}
              className="inline-flex items-center gap-2.5 text-sm text-white/70"
            >
              <span
                className="h-1 w-1 shrink-0 rounded-full bg-signal"
                aria-hidden
              />
              {point}
            </span>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-paper">
        <div className="mx-auto grid max-w-6xl gap-0 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="relative min-h-[28rem] lg:min-h-[36rem]">
            <Image
              src="/placeholders/asset-4.jpg"
              alt="Sofas wrapped in quilted protective covers during a Move It Dan job"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </Reveal>
          <Reveal className="flex flex-col justify-center px-5 py-16 sm:px-10 sm:py-20 lg:px-14">
            <p className="condensed flex items-center gap-2 text-[0.72rem] text-signal">
              <Motif size={14} />
              Why us
            </p>
            <h2 className="display mt-4 text-3xl leading-tight sm:text-4xl md:text-5xl">
              Moving with care, not chaos
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-steel sm:text-lg">
              We treat your goods as if they were our own. Proper protection for
              furniture, fragiles, floors, and stairs, plus straight updates
              until the unload is done.
            </p>
            <div className="mt-10 space-y-6 border-t border-line pt-8">
              <div>
                <h3 className="display text-xl sm:text-2xl">
                  Reliable and experienced
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel sm:text-base">
                  Built on careful jobs and clear communication. Ask for recent
                  references when you get in touch.
                </p>
              </div>
              <div>
                <h3 className="display text-xl sm:text-2xl">
                  Protection that shows
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-steel sm:text-base">
                  Quilted covers, TV wraps, stair runners, and wardrobe boxes so
                  clothes stay on hangers and rooms stay protected.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Reveal>
            <p className="condensed flex items-center gap-2 text-[0.72rem] text-signal">
              <Motif tone="chalk" size={14} />
              Services
            </p>
            <h2 className="display mt-4 max-w-xl text-3xl sm:text-4xl md:text-5xl">
              What we can handle
            </h2>
            <p className="mt-4 max-w-lg text-white/60">
              Domestic, commercial, packing, and overseas. One team, clear
              quotes, hard CTAs when you are ready.
            </p>
          </Reveal>

          <div className="mt-14 divide-y divide-white/12 border-y border-white/12">
            {services.map((service, index) => (
              <Reveal
                key={service.slug}
                as="article"
                className="grid gap-4 py-8 sm:grid-cols-[5rem_1fr_auto] sm:items-baseline sm:gap-8"
              >
                <p className="condensed text-[0.7rem] text-signal">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="display text-2xl sm:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
                    {service.blurb}
                  </p>
                </div>
                <Link
                  href="/services"
                  className="text-sm font-semibold text-white underline-offset-4 hover:underline sm:justify-self-end"
                >
                  Details
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-[70svh] overflow-hidden bg-black text-white">
        <Image
          src="/placeholders/van-house.jpg"
          alt="Move It Dan van outside a UK home"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.55)_48%,rgba(0,0,0,0.35)_100%)]" />
        <div className="relative mx-auto flex min-h-[70svh] max-w-6xl items-end px-5 py-16 sm:px-8 sm:py-20">
          <Reveal className="max-w-lg">
            <p className="condensed flex items-center gap-2 text-[0.72rem] text-signal">
              <Motif tone="chalk" size={14} />
              Coverage
            </p>
            <h2 className="display mt-4 text-3xl sm:text-4xl md:text-5xl">
              UK-wide and overseas
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70">
              Local street moves, long UK hauls, and international removals. If
              you can name the destination, ask for a quote.
            </p>
            <Link
              href="/coverage"
              className="mt-7 inline-flex rounded-sm border border-white/30 px-5 py-3 text-sm font-semibold text-white no-underline hover:bg-white/8"
            >
              View coverage
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <p className="condensed flex items-center gap-2 text-[0.72rem] text-signal">
              <Motif size={14} />
              FAQ
            </p>
            <h2 className="display mt-4 text-3xl sm:text-4xl">Quick answers</h2>
          </Reveal>
          <div className="mt-10 divide-y divide-line border-y border-line">
            {faqs.slice(0, 3).map((faq) => (
              <Reveal key={faq.question} className="py-7">
                <h3 className="display text-xl sm:text-2xl">{faq.question}</h3>
                <p className="mt-3 max-w-3xl text-steel leading-relaxed">
                  {faq.answer}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <Link
              href="/faq"
              className="text-sm font-semibold text-ink underline-offset-4 hover:underline"
            >
              Read all FAQs
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <p className="condensed flex items-center gap-2 text-[0.72rem] text-signal">
              <Motif tone="chalk" size={14} />
              Reviews
            </p>
            <h2 className="display mt-4 max-w-2xl text-3xl sm:text-4xl">
              Customer words, when approved
            </h2>
            <p className="mt-5 max-w-2xl text-white/60 leading-relaxed">
              This rebuild does not invent star ratings or fake testimonials.
              Approved review text and permissions go here next.
            </p>
            <Link
              href="/reviews"
              className="mt-8 inline-flex text-sm font-semibold text-white underline-offset-4 hover:underline"
            >
              See review structure
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { coverage, photos } from "@/content/site";

export const metadata: Metadata = {
  title: "Coverage",
  description: "Full UK coverage and overseas moves with Move It Dan.",
};

export default function CoveragePage() {
  return (
    <>
      <PageHero
        eyebrow="Coverage"
        title="Across the UK, and beyond"
        lead="Whole-UK removals plus international moves. Distance is part of the quote, not a surprise on the day."
      />

      <section className="bg-paper">
        <div className="site-shell py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal as="article" className="border-t border-line pt-8">
              <p className="eyebrow">United Kingdom</p>
              <h2 className="display mt-3 text-3xl">{coverage.uk.title}</h2>
              <p className="mt-4 leading-relaxed text-steel">{coverage.uk.body}</p>
              <ul className="mt-6 space-y-2.5 text-sm text-ink-soft">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-signal" aria-hidden />
                  Local same-city and same-county moves
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-signal" aria-hidden />
                  Long-distance UK collections and deliveries
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-signal" aria-hidden />
                  Domestic and commercial destinations
                </li>
              </ul>
            </Reveal>
            <Reveal as="article" className="border-t border-line pt-8">
              <p className="eyebrow">International</p>
              <h2 className="display mt-3 text-3xl">{coverage.overseas.title}</h2>
              <p className="mt-4 leading-relaxed text-steel">
                {coverage.overseas.body}
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-ink-soft">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-signal" aria-hidden />
                  Export-ready packing on request
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-signal" aria-hidden />
                  Quote based on volume, access, and destination
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-signal" aria-hidden />
                  Clear communication while goods are in transit
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative min-h-[60svh] overflow-hidden bg-ink text-white">
        <Image
          src={photos.van.src}
          alt={photos.van.alt}
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,21,32,0.88)_0%,rgba(12,21,32,0.55)_55%,rgba(12,21,32,0.3)_100%)]" />
        <div className="site-shell relative flex min-h-[60svh] items-end py-16">
          <Reveal className="max-w-lg">
            <h2 className="display text-3xl sm:text-4xl">No move is too far</h2>
            <p className="mt-4 leading-relaxed text-white/70">
              Share your from and to addresses when you request a quote. We will
              confirm access notes, timing, and packing needs before the job is
              booked.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

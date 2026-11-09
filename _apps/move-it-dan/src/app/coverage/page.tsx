import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { Motif } from "@/components/Motif";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { coverage } from "@/content/site";

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
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal as="article" className="border-t border-line pt-8">
              <p className="condensed flex items-center gap-2 text-[0.7rem] text-signal">
                <Motif size={14} />
                United Kingdom
              </p>
              <h2 className="display mt-3 text-3xl">{coverage.uk.title}</h2>
              <p className="mt-4 text-steel leading-relaxed">
                {coverage.uk.body}
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-ink-soft">
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden />
                  Local same-city and same-county moves
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden />
                  Long-distance UK collections and deliveries
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden />
                  Domestic and commercial destinations
                </li>
              </ul>
            </Reveal>
            <Reveal as="article" className="border-t border-line pt-8">
              <p className="condensed flex items-center gap-2 text-[0.7rem] text-signal">
                <Motif size={14} />
                International
              </p>
              <h2 className="display mt-3 text-3xl">
                {coverage.overseas.title}
              </h2>
              <p className="mt-4 text-steel leading-relaxed">
                {coverage.overseas.body}
              </p>
              <ul className="mt-6 space-y-2.5 text-sm text-ink-soft">
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden />
                  Export-ready packing on request
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden />
                  Quote based on volume, access, and destination
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden />
                  Clear communication while goods are in transit
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative min-h-[60svh] overflow-hidden bg-black text-white">
        <Image
          src="/placeholders/van-house.jpg"
          alt="Move It Dan van on a UK driveway"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.5)_55%,rgba(0,0,0,0.3)_100%)]" />
        <div className="relative mx-auto flex min-h-[60svh] max-w-6xl items-end px-5 py-16 sm:px-10">
          <Reveal className="max-w-lg">
            <h2 className="display text-3xl sm:text-4xl">No move is too far</h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              Share your from and to addresses when you request a quote. We will
              confirm access notes, timing, and packing needs before the job is
              booked.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand title="Ask about your route" />
    </>
  );
}

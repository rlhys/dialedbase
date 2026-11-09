import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { LabeledImage } from "@/components/LabeledImage";
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

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal as="article" className="border-t border-line pt-8">
            <p className="condensed text-[0.7rem] text-signal-deep">
              United Kingdom
            </p>
            <h2 className="display mt-3 text-3xl">{coverage.uk.title}</h2>
            <p className="mt-4 text-steel leading-relaxed">{coverage.uk.body}</p>
            <ul className="mt-6 space-y-2 text-sm text-ink-soft">
              <li>Local same-city and same-county moves</li>
              <li>Long-distance UK collections and deliveries</li>
              <li>Domestic and commercial destinations</li>
            </ul>
          </Reveal>
          <Reveal as="article" className="border-t border-line pt-8">
            <p className="condensed text-[0.7rem] text-signal-deep">
              International
            </p>
            <h2 className="display mt-3 text-3xl">{coverage.overseas.title}</h2>
            <p className="mt-4 text-steel leading-relaxed">
              {coverage.overseas.body}
            </p>
            <ul className="mt-6 space-y-2 text-sm text-ink-soft">
              <li>Export-ready packing on request</li>
              <li>Quote based on volume, access, and destination</li>
              <li>Clear communication while goods are in transit</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink text-chalk">
        <div className="mx-auto grid max-w-6xl gap-0 lg:grid-cols-2">
          <LabeledImage
            src="/placeholders/van-house.jpg"
            alt="Move It Dan van on a UK driveway"
            label="Client photo: UK collection day"
            className="min-h-[22rem]"
            imageClassName="object-cover object-center"
          />
          <div className="flex flex-col justify-center px-5 py-14 sm:px-10">
            <Reveal>
              <h2 className="display text-3xl sm:text-4xl">
                No move is too far
              </h2>
              <p className="mt-4 text-white/70 leading-relaxed">
                Share your from and to addresses when you request a quote. We
                will confirm access notes, timing, and packing needs before the
                job is booked.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand title="Ask about your route" />
    </>
  );
}

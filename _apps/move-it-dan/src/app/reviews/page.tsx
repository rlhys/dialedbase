import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Approved customer reviews for Move It Dan will appear here once permission is confirmed.",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="Real feedback only"
        lead="We are not inventing star ratings or quotes for this rebuild. When Dan shares approved review text or Google links, this page fills in properly."
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <Reveal>
            <p className="eyebrow">Holding space</p>
            <p className="mt-5 text-lg leading-relaxed text-steel sm:text-xl">
              The previous site mentioned strong reviews. Until we have
              permission to publish specific customer words, this page stays
              empty of invented quotes.
            </p>
          </Reveal>

          <Reveal className="mt-14 border-t border-line pt-10">
            <h2 className="display text-2xl sm:text-3xl">What we need from you</h2>
            <ul className="mt-6 space-y-3 text-steel">
              <li className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden />
                3 to 6 approved review quotes, or a public Google review link
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden />
                Permission to show first names / towns if included
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden />
                Any reviews that must not be republished
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

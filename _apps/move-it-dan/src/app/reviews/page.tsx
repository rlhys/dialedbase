import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { reviewPlaceholders } from "@/content/site";

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

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <p className="max-w-2xl text-steel leading-relaxed">
            The previous site mentioned strong reviews. Until we have permission
            to publish specific customer words, these slots stay clearly marked
            as placeholders.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviewPlaceholders.map((slot) => (
            <Reveal
              key={slot.id}
              as="article"
              className="border border-dashed border-line bg-chalk/80 p-6"
            >
              <p className="condensed text-[0.68rem] text-signal-deep">
                Placeholder
              </p>
              <h2 className="display mt-3 text-2xl">{slot.label}</h2>
              <p className="mt-3 text-sm text-steel">{slot.note}</p>
              <div className="mt-8 space-y-2" aria-hidden>
                <div className="h-2 w-[80%] bg-mist" />
                <div className="h-2 w-full bg-mist" />
                <div className="h-2 w-[60%] bg-mist" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 max-w-2xl border-t border-line pt-10">
          <h2 className="display text-2xl sm:text-3xl">What we need from you</h2>
          <ul className="mt-4 space-y-2 text-steel">
            <li>3 to 6 approved review quotes, or a public Google review link</li>
            <li>Permission to show first names / towns if included</li>
            <li>Any reviews that must not be republished</li>
          </ul>
        </Reveal>
      </section>

      <CtaBand title="Happy with a past move? Tell Dan" />
    </>
  );
}

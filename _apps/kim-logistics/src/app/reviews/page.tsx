import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { MotionHashes } from "@/components/MotionHashes";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { reviews } from "@/content/site";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Customer feedback for Kim Logistics. Currently featuring the existing Tommy Hyde testimonial from the live site.",
};

export default function ReviewsPage() {
  const review = reviews[0];

  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="What customers say."
        support="We are only showing testimonials already published on the current Kim Logistics site. More reviews can be added once permissions are confirmed."
      />

      <section className="bg-paper">
        <div className="site-shell py-16 md:py-24">
          <Reveal as="article" className="mx-auto max-w-3xl border-t border-ink/15 pt-10">
            <div className="flex items-center gap-3">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-mute">
                Existing testimonial
              </p>
              <MotionHashes tone="ink" />
            </div>
            <blockquote className="mt-8">
              <p className="font-display text-2xl leading-snug tracking-[-0.02em] text-ink sm:text-3xl md:text-4xl">
                “{review.quote}”
              </p>
              <footer className="mt-8 text-base text-mute">
                <cite className="not-italic font-semibold text-ink">{review.name}</cite>
                {" · "}
                {review.place}
              </footer>
            </blockquote>
            <p className="mt-8 text-sm text-mute">{review.sourceNote}</p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
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

      <section className="site-shell py-16 md:py-24">
        <Reveal as="article" className="mx-auto max-w-3xl border border-ink/10 bg-paper/80 p-8 md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-moss">
            Existing testimonial
          </p>
          <blockquote className="mt-6">
            <p className="font-display text-2xl leading-snug tracking-tight text-ink sm:text-3xl md:text-4xl">
              “{review.quote}”
            </p>
            <footer className="mt-8 text-base text-steel">
              <cite className="not-italic font-semibold text-ink">{review.name}</cite>
              {" · "}
              {review.place}
            </footer>
          </blockquote>
          <p className="mt-8 text-sm text-steel">{review.sourceNote}</p>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}

import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { pillars, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Move It Dan says the work has built a reputation of 5 star reviews. Specific quotes are added only when a customer approves them.",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="Only 5 star reviews"
        lead="The current Move It Dan site says the team has built a great reputation, resulting in only 5 star reviews. Named quotes go here once a customer has approved the wording."
      />

      <section className="bg-paper">
        <div className="site-shell max-w-3xl py-16 sm:py-20">
          <p className="text-lg leading-relaxed text-steel">{pillars[0].body}</p>
          <p className="mt-6 leading-relaxed text-steel">
            Want a reference before you book? Call {site.phoneDisplay} or message on WhatsApp and ask.
            This page does not invent testimonials.
          </p>
          <a href={site.whatsapp} className="btn btn-signal mt-8">
            Message on WhatsApp
          </a>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

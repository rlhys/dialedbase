import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { Reveal } from "@/components/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact / Quote",
  description:
    "Get a free quote or call Move It Dan to schedule your move.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get a quote for your move"
        lead="We stay in touch until the job is done. For a free quote, questions, or special requests, reach out below."
      />

      <section className="bg-paper">
        <div className="site-shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <p className="eyebrow">Call</p>
            <a
              href={`tel:${site.phoneTel}`}
              className="display mt-4 block text-4xl tracking-tight text-ink no-underline transition-colors hover:text-signal sm:text-5xl"
            >
              {site.phoneDisplay}
            </a>
            <p className="mt-5 max-w-sm leading-relaxed text-steel">
              Prefer to talk it through? Call to schedule your move or ask about
              packing, access, or overseas timing.
            </p>
            <div className="mt-10 space-y-5 border-t border-line pt-8 text-sm text-ink-soft">
              <p>
                <span className="font-semibold text-ink">
                  Domestic &amp; commercial
                </span>
                <br />
                House moves, offices, and mixed loads
              </p>
              <p>
                <span className="font-semibold text-ink">UK &amp; overseas</span>
                <br />
                Full coverage with clear quotes
              </p>
              <p>
                <span className="font-semibold text-ink">Fully insured</span>
                <br />
                Ask for certificate details on request
              </p>
            </div>
          </Reveal>

          <Reveal className="border border-line bg-chalk p-6 sm:p-8">
            <h2 className="display text-2xl sm:text-3xl">Quote form</h2>
            <div className="mt-6">
              <QuoteForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

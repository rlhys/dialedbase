import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { faqs } from "@/content/site";

export const metadata: Metadata = {
  title: "FAQ and pricing guidance",
  description:
    "Guidance on Coventry removal costs, booking windows, packing, and storage from Kim Logistics. All prices subject to quote.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Straight answers before you book."
        support="Pricing ranges below mirror the current live site as guidance only. Your move is always subject to a tailored quote."
      />

      <section className="bg-paper">
        <div className="site-shell py-16 md:py-24">
          <div className="mx-auto max-w-3xl space-y-0 border-t border-ink/15">
            {faqs.map((faq) => (
              <Reveal key={faq.id}>
                <details className="group border-b border-ink/15 open:bg-field/60">
                  <summary className="cursor-pointer list-none px-1 py-6 font-display text-xl tracking-[-0.02em] text-ink marker:content-none [&::-webkit-details-marker]:hidden sm:px-2">
                    <span className="flex items-start justify-between gap-4">
                      {faq.question}
                      <span
                        aria-hidden
                        className="mt-1 text-signal transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </span>
                  </summary>
                  <div className="border-t border-ink/10 px-1 py-5 text-base leading-relaxed text-mute sm:px-2">
                    {faq.answer}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>

          <Reveal className="mx-auto mt-12 max-w-3xl bg-ink px-6 py-8 text-paper">
            <p className="font-display text-2xl tracking-[-0.02em]">Need a firm figure?</p>
            <p className="mt-2 text-paper/72">
              Share property size, dates, and access notes. We will come back with a clear,
              no-obligation quote.
            </p>
            <Link href="/contact" className="btn-solid btn-signal mt-6">
              Request a quote
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

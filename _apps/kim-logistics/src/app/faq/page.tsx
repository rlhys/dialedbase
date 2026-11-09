import type { Metadata } from "next";
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

      <section className="site-shell py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq) => (
            <Reveal key={faq.id}>
              <details className="group border border-ink/10 bg-paper/80 open:border-signal/40">
                <summary className="cursor-pointer list-none px-5 py-5 font-display text-xl tracking-tight text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    {faq.question}
                    <span aria-hidden className="mt-1 text-signal transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <div className="border-t border-ink/10 px-5 py-5 text-base leading-relaxed text-steel">
                  {faq.answer}
                </div>
              </details>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-10 max-w-3xl rounded-xl bg-ink px-5 py-6 text-paper">
          <p className="font-display text-2xl tracking-tight">Need a firm figure?</p>
          <p className="mt-2 text-paper/75">
            Share property size, dates, and access notes. We will come back with a clear,
            no-obligation quote.
          </p>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}

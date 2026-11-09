import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { faqs } from "@/content/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about furniture dismantling, protection, UK coverage, packing, and insurance.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Straight answers before you book"
        lead="If your question is not here, call or send a quote request and we will reply with specifics for your move."
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="divide-y divide-line border-y border-line">
            {faqs.map((faq, index) => (
              <Reveal key={faq.question} className="py-8">
                <p className="condensed mb-3 flex items-center gap-2 text-[0.65rem] text-signal">
{String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="display text-xl sm:text-2xl">{faq.question}</h2>
                <p className="mt-3 text-steel leading-relaxed">{faq.answer}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

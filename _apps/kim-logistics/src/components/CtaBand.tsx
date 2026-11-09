import Link from "next/link";
import { contact, homeCopy } from "@/content/site";
import { MotionHashes } from "@/components/MotionHashes";
import { Reveal } from "@/components/Reveal";

export function CtaBand() {
  return (
    <section className="bg-paper">
      <div className="site-shell py-16 md:py-20">
        <Reveal className="relative overflow-hidden bg-ink px-6 py-12 text-paper sm:px-10 md:px-14 md:py-16">
          <div className="relative grid gap-8 md:grid-cols-[1.45fr_auto] md:items-end">
            <div>
              <div className="flex items-center gap-3">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-signal">
                  Next step
                </p>
                <MotionHashes tone="signal" />
              </div>
              <h2 className="font-display mt-4 text-3xl tracking-[-0.03em] sm:text-4xl md:text-5xl">
                {homeCopy.ctaTitle}
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-paper/72">
                {homeCopy.ctaSupport}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-signal px-5 py-3 text-base font-semibold tracking-tight text-ink transition hover:bg-signal-deep hover:text-paper"
              >
                Start your quote
              </Link>
              <a
                href={contact.phoneHref}
                className="inline-flex items-center justify-center border border-paper/30 px-5 py-3 text-base font-semibold tracking-tight text-paper transition hover:border-paper"
              >
                Call {contact.phoneDisplay}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

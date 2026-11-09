"use client";

import { FadeIn } from "@/components/Motion";
import { MotionHashes } from "@/components/MotionHashes";
import { cx } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  support: string;
  className?: string;
};

/** Interior page hero — typography only. No logo repeat. */
export function PageHero({ eyebrow, title, support, className }: PageHeroProps) {
  return (
    <section
      id="brand-hero"
      className={cx("relative overflow-hidden bg-ink text-paper", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_85%_-10%,rgba(255,107,26,0.16),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-signal/50 to-transparent"
      />
      <div className="site-shell relative pb-16 pt-32 md:pb-24 md:pt-36">
        {eyebrow ? (
          <FadeIn>
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-signal">
              {eyebrow}
            </p>
          </FadeIn>
        ) : null}
        <FadeIn delay={0.06}>
          <h1 className="font-display mt-5 max-w-4xl text-balance text-4xl leading-[1.02] tracking-[-0.03em] sm:text-5xl md:text-6xl">
            {title}
          </h1>
        </FadeIn>
        <FadeIn delay={0.12}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-paper/72 md:text-xl">
            {support}
          </p>
        </FadeIn>
        <FadeIn delay={0.18}>
          <div className="mt-8 flex items-center gap-4">
            <span className="h-px w-16 bg-signal" />
            <MotionHashes className="hash-pulse" tone="signal" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

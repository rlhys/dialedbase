"use client";

import { FadeIn } from "@/components/Motion";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  lead: string;
};

/** Light interior page hero — no logo, no Motif, no dark template clone. */
export function PageHero({ eyebrow, title, lead }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-[linear-gradient(180deg,#eef4fa_0%,#f6f8fb_55%,#ffffff_100%)]">
      <div
        className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full signal-glow opacity-45"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-28 sm:px-8 sm:pb-16 sm:pt-32">
        {eyebrow ? (
          <FadeIn>
            <p className="eyebrow">{eyebrow}</p>
          </FadeIn>
        ) : null}
        <FadeIn delay={0.06}>
          <h1 className="display mt-3 max-w-3xl text-4xl leading-[1.05] text-ink sm:text-5xl">
            <span className="shine-text-ink">{title}</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel sm:text-lg">
            {lead}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

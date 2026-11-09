import { MotionHashes } from "@/components/MotionHashes";
import { cx } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  support: string;
  className?: string;
};

export function PageHero({ eyebrow, title, support, className }: PageHeroProps) {
  return (
    <section id="brand-hero" className={cx("relative overflow-hidden bg-ink text-paper", className)}>
      {/* Sharp geometric accents — not soft glow glass */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-1/3 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-28deg, transparent, transparent 18px, #ff5c1a 18px, #ff5c1a 20px)",
        }}
      />
      <div className="site-shell relative pb-16 pt-32 md:pb-24 md:pt-36">
        {eyebrow ? (
          <div className="animate-rise flex items-center gap-3">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-signal">
              {eyebrow}
            </p>
            <MotionHashes tone="signal" />
          </div>
        ) : null}
        <h1 className="font-display animate-rise-delay-1 mt-5 max-w-4xl text-balance text-4xl leading-[1.02] tracking-[-0.03em] sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="animate-rise-delay-2 mt-5 max-w-2xl text-lg leading-relaxed text-paper/72 md:text-xl">
          {support}
        </p>
        <div className="animate-rise-delay-3 mt-8 h-px w-24 bg-signal" />
      </div>
    </section>
  );
}

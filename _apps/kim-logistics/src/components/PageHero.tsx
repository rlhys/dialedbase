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
    <section
      id="brand-hero"
      className={cx("relative overflow-hidden bg-ink text-paper", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_85%_-10%,rgba(255,92,26,0.18),transparent_60%)]"
      />
      <div className="site-shell relative pb-16 pt-32 md:pb-24 md:pt-36">
        {eyebrow ? (
          <p className="animate-rise text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-signal">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display animate-rise-delay-1 mt-5 max-w-4xl text-balance text-4xl leading-[1.02] tracking-[-0.03em] sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="animate-rise-delay-2 mt-5 max-w-2xl text-lg leading-relaxed text-paper/72 md:text-xl">
          {support}
        </p>
        <div className="animate-rise-delay-3 mt-8 flex items-center gap-4">
          <span className="h-px w-16 bg-signal" />
          <MotionHashes className="hash-pulse" tone="signal" />
        </div>
      </div>
    </section>
  );
}

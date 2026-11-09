import { cx } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  support: string;
  className?: string;
};

export function PageHero({ eyebrow, title, support, className }: PageHeroProps) {
  return (
    <section className={cx("atmosphere border-b border-[var(--line)] bg-ink text-paper", className)}>
      <div className="site-shell py-16 md:py-24">
        {eyebrow ? (
          <p className="animate-rise text-xs font-semibold uppercase tracking-[0.22em] text-signal">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display animate-rise-delay-1 mt-4 max-w-4xl text-balance text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="animate-rise-delay-2 mt-5 max-w-2xl text-lg leading-relaxed text-paper/75 md:text-xl">
          {support}
        </p>
        <div className="animate-rise-delay-3 mt-8 h-1 w-28 origin-left rounded-full bg-signal signal-underline" />
      </div>
    </section>
  );
}

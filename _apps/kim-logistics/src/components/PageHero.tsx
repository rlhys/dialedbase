import { cx } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  support: string;
  className?: string;
};

export function PageHero({ eyebrow, title, support, className }: PageHeroProps) {
  return (
    <section className={cx("border-b border-[var(--line)] bg-field", className)}>
      <div className="site-shell pb-12 pt-28 md:pb-16 md:pt-32">
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-signal">{eyebrow}</p>
        ) : null}
        <h1 className="font-display mt-3 max-w-3xl text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-ink sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mute">{support}</p>
      </div>
    </section>
  );
}

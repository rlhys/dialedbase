import { cx } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  support: string;
  className?: string;
};

export function PageHero({ eyebrow, title, support, className }: PageHeroProps) {
  return (
    <section className={cx("border-b border-[var(--line)]", className)}>
      <div className="site-shell pb-12 pt-28 md:pb-16 md:pt-36">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.02] tracking-[-0.03em] text-bark sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone md:text-xl">{support}</p>
      </div>
    </section>
  );
}

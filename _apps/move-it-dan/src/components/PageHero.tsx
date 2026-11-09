type PageHeroProps = {
  eyebrow?: string;
  title: string;
  lead: string;
};

/** Interior page intro - light field, no logo, no dark template clone. */
export function PageHero({ eyebrow, title, lead }: PageHeroProps) {
  return (
    <section className="border-b border-line bg-field">
      <div className="site-shell pb-14 pt-28 sm:pb-16 sm:pt-32">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="display mt-3 max-w-3xl text-4xl leading-[1.02] text-ink sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel sm:text-lg">
          {lead}
        </p>
      </div>
    </section>
  );
}

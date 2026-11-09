type PageHeroProps = {
  eyebrow?: string;
  title: string;
  lead: string;
};

/** Light interior page hero — no logo, no dark template clone. */
export function PageHero({ eyebrow, title, lead }: PageHeroProps) {
  return (
    <section className="border-b border-line bg-mist/60">
      <div className="mx-auto max-w-6xl px-5 pb-14 pt-28 sm:px-8 sm:pb-16 sm:pt-32">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="display mt-3 max-w-3xl text-4xl leading-[1.05] text-ink sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel sm:text-lg">
          {lead}
        </p>
      </div>
    </section>
  );
}

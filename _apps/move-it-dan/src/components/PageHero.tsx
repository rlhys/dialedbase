type PageHeroProps = {
  eyebrow?: string;
  title: string;
  lead: string;
};

export function PageHero({ eyebrow, title, lead }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-ink text-chalk">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 85% 20%, color-mix(in srgb, var(--signal) 28%, transparent), transparent 55%), linear-gradient(160deg, #0c1624 0%, #152436 55%, #0c1624 100%)",
        }}
        aria-hidden
      />
      <div className="grain relative mx-auto max-w-6xl px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32">
        {eyebrow ? (
          <p className="condensed hero-rise text-[0.72rem] text-signal">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="display hero-rise hero-rise-delay-1 mt-3 max-w-3xl text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="hero-rise hero-rise-delay-2 mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
          {lead}
        </p>
      </div>
    </section>
  );
}

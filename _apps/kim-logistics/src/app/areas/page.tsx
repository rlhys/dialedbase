import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { areas } from "@/content/site";

export const metadata: Metadata = {
  title: "Areas served",
  description:
    "Kim Logistics serves Coventry and surrounding West Midlands towns including Leamington Spa, Rugby, Nuneaton, Kenilworth, and Bedworth.",
};

export default function AreasPage() {
  return (
    <>
      <PageHero
        eyebrow="Areas served"
        title="Coventry first. West Midlands covered."
        support={areas.intro}
      />

      <section className="site-shell py-16 md:py-24">
        <Reveal>
          <p className="max-w-2xl text-lg leading-relaxed text-steel">
            Local SEO without stuffing: we serve people moving in and around these places, and we are
            happy to discuss further afield when the route makes sense.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areas.places.map((place) => (
            <Reveal key={place} as="li">
              <div className="border border-ink/10 bg-paper/70 px-5 py-6">
                <p className="font-display text-2xl tracking-tight text-ink">{place}</p>
                <p className="mt-2 text-sm text-steel">
                  Removals to and from {place}, quoted around your access and timing.
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12 max-w-2xl">
          <p className="text-base leading-relaxed text-steel">
            Moving somewhere not listed? Ask anyway. Long-distance jobs are part of the service when
            the route and timing work.
          </p>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}

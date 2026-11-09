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

      <section className="bg-paper">
        <div className="site-shell py-16 md:py-24">
          <Reveal>
            <p className="max-w-2xl text-lg leading-relaxed text-mute">
              We serve people moving in and around these places, and we are happy to discuss further
              afield when the route makes sense.
            </p>
          </Reveal>

          <ul className="mt-14 grid border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-3">
            {areas.places.map((place) => (
              <Reveal
                key={place}
                as="li"
                className="border-b border-ink/15 px-0 py-7 sm:border-r sm:px-6 sm:odd:pl-0 lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(3n+1)]:pl-0"
              >
                <p className="font-display text-2xl tracking-[-0.02em] text-ink">{place}</p>
                <p className="mt-2 text-sm leading-relaxed text-mute">
                  Removals to and from {place}, quoted around your access and timing.
                </p>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-14 max-w-2xl">
            <p className="text-base leading-relaxed text-mute">
              Moving somewhere not listed? Ask anyway. Long-distance jobs are part of the service when
              the route and timing work.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

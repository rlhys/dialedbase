import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { photos, services } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Domestic and commercial moves, packing, and overseas removals with Move It Dan.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Moves sized to your home or workplace"
        lead="From a careful flat move to a full packing and overseas collection, we scope the job properly before wheels turn."
      />

      <section className="bg-paper">
        <div className="site-shell py-16 sm:py-20">
          <div className="space-y-20">
            {services.map((service, index) => {
              const flip = index % 2 === 1;
              return (
                <Reveal
                  key={service.slug}
                  as="article"
                  className={`grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14 ${
                    flip ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-field">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                  <div>
                    <p className="eyebrow">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="display mt-3 text-3xl sm:text-4xl">
                      {service.title}
                    </h2>
                    <p className="mt-4 leading-relaxed text-steel">
                      {service.blurb}
                    </p>
                    <ul className="mt-6 space-y-2.5 text-sm text-ink-soft">
                      {service.details.map((detail) => (
                        <li key={detail} className="flex gap-3">
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 bg-signal"
                            aria-hidden
                          />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="grid gap-0 lg:grid-cols-2">
          <div className="relative min-h-[22rem]">
            <Image
              src={photos.crew.src}
              alt={photos.crew.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center px-6 py-14 sm:px-12">
            <Reveal>
              <h2 className="display text-3xl sm:text-4xl">
                Exact service list welcome
              </h2>
              <p className="mt-4 leading-relaxed text-white/65">
                This page mirrors what the live site already offers. If Dan wants
                piano moves, single-item runs, storage links, or student moves
                called out by name, we will add them without inventing extras.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

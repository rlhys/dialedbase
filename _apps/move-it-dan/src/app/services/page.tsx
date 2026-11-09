import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { services } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Domestic and commercial moves, packing, and overseas removals with Move It Dan.",
};

const serviceImages = [
  {
    src: "/placeholders/crew-boxes.jpg",
    alt: "Move It Dan crew carrying labelled boxes on a domestic move",
  },
  {
    src: "/placeholders/asset-5.jpg",
    alt: "Move It Dan vans ready for a commercial or large domestic job",
  },
  {
    src: "/placeholders/asset-4.jpg",
    alt: "Furniture wrapped in quilted covers",
  },
  {
    src: "/placeholders/van-house.jpg",
    alt: "Removal van outside a UK home",
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Moves sized to your home or workplace"
        lead="From a careful flat move to a full packing and overseas collection, we scope the job properly before wheels turn."
      />

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="space-y-20">
            {services.map((service, index) => {
              const image = serviceImages[index];
              const flip = index % 2 === 1;
              return (
                <Reveal
                  key={service.slug}
                  as="article"
                  className={`grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14 ${
                    flip ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  {image ? (
                    <div className="relative aspect-[4/3] min-h-[18rem] overflow-hidden bg-black">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  ) : null}
                  <div>
                    <p className="eyebrow text-[0.7rem] text-signal">
{String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="display mt-3 text-3xl sm:text-4xl">
                      {service.title}
                    </h2>
                    <p className="mt-4 text-steel leading-relaxed">
                      {service.blurb}
                    </p>
                    <ul className="mt-6 space-y-2.5 text-sm text-ink-soft">
                      {service.details.map((detail) => (
                        <li key={detail} className="flex gap-3">
                          <span
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal"
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

      <section className="relative overflow-hidden bg-black text-white">
        <div className="mx-auto grid max-w-6xl gap-0 lg:grid-cols-2">
          <div className="relative min-h-[22rem]">
            <Image
              src="/placeholders/asset-6.jpg"
              alt="Move It Dan team standing with branded vans"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center px-5 py-14 sm:px-10">
            <Reveal>
              <h2 className="display text-3xl sm:text-4xl">
                Exact service list welcome
              </h2>
              <p className="mt-4 text-white/65 leading-relaxed">
                This page mirrors what the current site already offers. If Dan
                wants piano moves, single-item runs, storage links, or student
                moves called out by name, we will add them without inventing
                extras.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

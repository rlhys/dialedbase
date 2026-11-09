import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { LabeledImage } from "@/components/LabeledImage";
import { PageHero } from "@/components/PageHero";
import { PlaceholderMedia } from "@/components/PlaceholderMedia";
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
    label: "Client photo: domestic packing and carry-out",
  },
  {
    src: "/placeholders/asset-5.jpg",
    alt: "Move It Dan vans ready for a commercial or large domestic job",
    label: "Client photo: fleet capacity for larger moves",
  },
  {
    src: "/placeholders/asset-4.jpg",
    alt: "Furniture wrapped in quilted covers",
    label: "Client photo: packing and furniture protection",
  },
  {
    src: "/placeholders/van-house.jpg",
    alt: "Removal van outside a UK home",
    label: "Client photo: collection day at a UK address",
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

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-14">
          {services.map((service, index) => {
            const image = serviceImages[index];
            return (
              <Reveal
                key={service.slug}
                as="article"
                className={`grid gap-8 lg:grid-cols-2 lg:items-center ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {image ? (
                  <LabeledImage
                    src={image.src}
                    alt={image.alt}
                    label={image.label}
                    className="min-h-[18rem] aspect-[4/3]"
                  />
                ) : (
                  <PlaceholderMedia
                    label={`Client photo needed: ${service.title.toLowerCase()}`}
                    hint="Replace with a real job photograph for this service"
                    tone={index % 2 === 0 ? "ink" : "mist"}
                    className="min-h-[18rem]"
                  />
                )}
                <div>
                  <p className="condensed text-[0.7rem] text-signal-deep">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="display mt-2 text-3xl sm:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-steel leading-relaxed">
                    {service.blurb}
                  </p>
                  <ul className="mt-6 space-y-2 text-sm text-ink-soft">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-signal" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-mist/50 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <LabeledImage
              src="/placeholders/asset-6.jpg"
              alt="Move It Dan team standing with branded vans"
              label="Client photo: crew and branded fleet"
              className="min-h-[18rem] aspect-[4/3]"
            />
          </Reveal>
          <Reveal className="flex flex-col justify-center">
            <h2 className="display text-3xl">Exact service list welcome</h2>
            <p className="mt-4 text-steel leading-relaxed">
              This page mirrors what the current site already offers. If Dan
              wants piano moves, single-item runs, storage links, or student
              moves called out by name, we will add them without inventing
              extras.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand title="Tell us what you are moving" />
    </>
  );
}

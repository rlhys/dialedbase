import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { services } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Home removals, office moves, packing, man and van, long-distance removals, and storage partners from Kim Logistics in Coventry.",
};

const SERVICE_IMAGES = [
  "/images/fleet.jpg",
  "/images/job-1.jpeg",
  "/images/job-2.jpeg",
  "/images/fleet.jpg",
  "/images/job-1.jpeg",
  "/images/job-2.jpeg",
] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Clear options for every kind of move."
        support="Choose the package that fits the job. We will confirm crew size, materials, and timing in your quote."
      />

      <section className="bg-paper">
        <div className="site-shell py-16 md:py-24">
          <div className="grid gap-16">
            {services.map((service, index) => (
              <Reveal
                key={service.id}
                as="article"
                className="grid items-center gap-8 border-b border-ink/10 pb-16 last:border-b-0 last:pb-0 lg:grid-cols-2 lg:gap-14"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : undefined}>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-mute">
                    Service 0{index + 1}
                  </p>
                  <h2 className="font-display mt-3 text-3xl tracking-[-0.03em] text-ink sm:text-4xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-mute">{service.summary}</p>
                  <p className="mt-4 text-base leading-relaxed text-ink/80">{service.detail}</p>
                </div>
                <div
                  className={`relative aspect-[5/3] overflow-hidden bg-ink ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <Image
                    src={SERVICE_IMAGES[index] ?? "/images/fleet.jpg"}
                    alt={`Kim Logistics supporting ${service.title}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

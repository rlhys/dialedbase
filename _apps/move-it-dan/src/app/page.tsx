import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { HeroStage } from "@/components/HeroStage";
import { FadeIn, Stagger, StaggerItem } from "@/components/Motion";
import { faqs, photos, services, trustPoints } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <HeroStage />

      <section className="border-y border-line bg-paper">
        <div className="site-shell flex flex-wrap gap-x-8 gap-y-3 py-5 text-sm text-ink-soft">
          {trustPoints.map((point) => (
            <span key={point} className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-signal" aria-hidden />
              {point}
            </span>
          ))}
        </div>
      </section>

      <section className="bg-paper">
        <div className="site-shell py-20 sm:py-28">
          <FadeIn>
            <p className="eyebrow">Why us</p>
            <h2 className="display mt-3 max-w-2xl text-3xl leading-tight sm:text-5xl">
              Moving with care,{" "}
              <span className="text-signal">not chaos</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-steel sm:text-lg">
              We treat your goods as if they were our own. Proper protection for
              furniture, fragiles, floors, and stairs.
            </p>
          </FadeIn>

          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <FadeIn>
              <div className="relative aspect-[4/3] overflow-hidden bg-field sm:min-h-[26rem]">
                <Image
                  src={photos.care.src}
                  alt={photos.care.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>
            <Stagger gap={0.1} className="space-y-10">
              <StaggerItem>
                <h3 className="display text-2xl sm:text-3xl">
                  Reliable and experienced
                </h3>
                <p className="mt-3 leading-relaxed text-steel">
                  Built on careful jobs and clear communication until the move is
                  done. Ask for recent references when you get in touch.
                </p>
              </StaggerItem>
              <StaggerItem>
                <h3 className="display text-2xl sm:text-3xl">
                  Protection that shows
                </h3>
                <p className="mt-3 leading-relaxed text-steel">
                  Quilted covers, TV wraps, stair runners, and wardrobe boxes so
                  clothes stay on hangers and rooms stay protected.
                </p>
              </StaggerItem>
            </Stagger>
          </div>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="site-shell py-20 sm:py-28">
          <FadeIn>
            <p className="eyebrow">Services</p>
            <h2 className="display mt-3 text-3xl sm:text-5xl">
              What we can handle
            </h2>
            <p className="mt-4 max-w-xl text-white/65">
              Domestic, commercial, packing, and overseas. One team, clear quotes.
            </p>
          </FadeIn>
          <Stagger
            gap={0.07}
            className="mt-12 grid gap-0 border-t border-white/15 sm:grid-cols-2"
          >
            {services.map((service) => (
              <StaggerItem key={service.slug}>
                <article className="h-full border-b border-white/15 p-6 transition-colors hover:bg-white/[0.03] sm:odd:border-r sm:odd:border-white/15">
                  <h3 className="display text-2xl text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    {service.blurb}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn delay={0.1} className="mt-8">
            <Link href="/services" className="link-quiet text-signal">
              See full services →
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="bg-field">
        <div className="site-shell grid gap-10 py-20 sm:py-28 lg:grid-cols-2 lg:items-center lg:gap-14">
          <FadeIn>
            <p className="eyebrow">Coverage</p>
            <h2 className="display mt-3 text-3xl sm:text-5xl">
              UK-wide and overseas
            </h2>
            <p className="mt-4 leading-relaxed text-steel">
              Local street moves, long UK hauls, and international removals. If
              you can name the destination, ask for a quote.
            </p>
            <Link href="/coverage" className="btn btn-ink mt-8">
              View coverage
            </Link>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="relative aspect-[4/3] overflow-hidden bg-ink">
              <Image
                src={photos.van.src}
                alt={photos.van.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="site-shell py-20 sm:py-28">
          <FadeIn>
            <p className="eyebrow">FAQ</p>
            <h2 className="display mt-3 text-3xl sm:text-5xl">Quick answers</h2>
          </FadeIn>
          <Stagger gap={0.06} className="mt-10 divide-y divide-line border-y border-line">
            {faqs.slice(0, 3).map((faq) => (
              <StaggerItem key={faq.question} className="py-6">
                <h3 className="display text-xl sm:text-2xl">{faq.question}</h3>
                <p className="mt-2 max-w-3xl leading-relaxed text-steel">
                  {faq.answer}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn className="mt-6">
            <Link href="/faq" className="link-quiet">
              Read all FAQs →
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="bg-paper">
        <div className="site-shell grid gap-10 py-20 sm:py-28 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <p className="eyebrow">Reviews</p>
            <h2 className="display mt-3 text-3xl sm:text-5xl">
              Customer words, when approved
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-steel">
              This rebuild does not invent star ratings or fake testimonials.
              Approved review text goes here next.
            </p>
            <Link href="/reviews" className="link-quiet mt-6 inline-flex">
              See review structure →
            </Link>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="relative aspect-[5/4] overflow-hidden bg-field">
              <Image
                src={photos.unload.src}
                alt={photos.unload.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

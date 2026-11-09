import Image from "next/image";
import Link from "next/link";
import { photos, site } from "@/content/site";

/**
 * Split hero: type on paper, scraped job photo beside it.
 * Logo stays in the header and footer only.
 */
export function HeroStage() {
  return (
    <section className="border-b border-line bg-paper">
      <div className="site-shell grid items-center gap-10 pb-14 pt-28 lg:grid-cols-12 lg:gap-12 lg:pb-20 lg:pt-32">
        <div className="lg:col-span-5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-signal">
            House, commercial, and overseas
          </p>
          <h1 className="display mt-4 text-[clamp(3.2rem,7vw,5.4rem)] leading-[0.9] text-ink">
            Moving made easy
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-steel">
            We treat your goods as if they were our own, with proper protection
            for furniture, fragiles, floors, and stairs.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn btn-signal">
              Get a quote
            </Link>
            <a href={`tel:${site.phoneTel}`} className="btn btn-outline">
              Call {site.phoneDisplay}
            </a>
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden border-l-8 border-signal bg-field sm:aspect-[5/4]">
            <Image
              src={photos.hero.src}
              alt={photos.hero.alt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

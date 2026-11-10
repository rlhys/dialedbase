import Image from "next/image";
import Link from "next/link";
import { contact, homeCopy } from "@/content/site";

/**
 * Dwell-style stacked hero: soft paper, serif display, soft media frame.
 * Wordmark stays in the header and footer only.
 */
export function HeroStage() {
  return (
    <section id="brand-hero" className="relative overflow-hidden">
      <div className="site-shell grid items-end gap-10 pb-14 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-20 lg:pt-36">
        <div className="max-w-xl">
          <p className="eyebrow animate-rise">{homeCopy.heroKicker}</p>
          <h1 className="font-display animate-rise-delay-1 mt-5 text-[clamp(3.4rem,9vw,6.4rem)] leading-[0.9] text-bark">
            <span className="block">A calm</span>
            <span className="block">way to</span>
            <span className="block italic text-bark-soft">move</span>
          </h1>
          <p className="animate-rise-delay-2 mt-6 max-w-md text-lg leading-relaxed text-stone md:text-xl">
            {homeCopy.heroSupport}
          </p>
          <div className="animate-rise-delay-3 mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/contact" className="btn-dwell btn-signal">
              Get a free quote
            </Link>
            <a href={contact.phoneHref} className="btn-dwell btn-ghost">
              Call {contact.phoneDisplay}
            </a>
          </div>
          <p className="mt-5 text-sm text-stone">
            Mobile{" "}
            <a className="font-semibold text-bark underline decoration-sky decoration-2 underline-offset-4" href={contact.mobileHref}>
              {contact.mobileDisplay}
            </a>
          </p>
        </div>

        <div className="animate-rise-delay-2 dwell-frame relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
          <Image
            src="/images/fleet.jpg"
            alt="Kim Logistics removal vans lined up on a drive"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 46vw"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bark/35 to-transparent p-5">
            <p className="font-mono-ui text-[0.68rem] text-chalk">Coventry · West Midlands</p>
          </div>
        </div>
      </div>
    </section>
  );
}

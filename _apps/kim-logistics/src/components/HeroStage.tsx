import Image from "next/image";
import Link from "next/link";
import { about, brand, contact, homeCopy } from "@/content/site";

/**
 * Paper hero with the live-site headline and the real fleet photo.
 * Wordmark stays in the header and footer.
 */
export function HeroStage() {
  return (
    <section id="brand-hero" className="border-b border-[var(--line)] bg-paper">
      <div className="site-shell grid items-center gap-10 pb-14 pt-28 lg:grid-cols-2 lg:gap-16 lg:pb-20 lg:pt-32">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-signal">
            {homeCopy.heroKicker}
          </p>
          <h1 className="font-display mt-4 text-[clamp(2.8rem,6vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.04em] text-ink">
            {homeCopy.heroHeadline}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-mute">{homeCopy.heroSupport}</p>
          <p className="mt-4 max-w-xl leading-relaxed text-ink">{about.family}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-solid btn-signal">
              Get a free quote
            </Link>
            <a href={contact.phoneHref} className="btn-solid btn-ghost-ink">
              Call {contact.phoneDisplay}
            </a>
          </div>
          <p className="mt-4 text-sm text-mute">
            Mobile{" "}
            <a className="font-semibold text-ink underline" href={contact.mobileHref}>
              {contact.mobileDisplay}
            </a>
          </p>
        </div>
        <div className="border-8 border-signal bg-field">
          <div className="relative aspect-square">
            <Image
              src="/images/fleet.jpg"
              alt="Kim Logistics removal vans lined up on a drive"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
      <p className="sr-only">{brand.name}</p>
    </section>
  );
}

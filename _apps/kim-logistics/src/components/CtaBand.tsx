import Link from "next/link";
import { contact, homeCopy } from "@/content/site";

export function CtaBand() {
  return (
    <section className="pb-16 md:pb-20">
      <div className="site-shell">
        <div className="rounded-[var(--radius-lg)] bg-sky px-6 py-12 text-bark sm:px-10 md:flex md:items-center md:justify-between md:gap-10 md:px-14 md:py-16">
          <div className="max-w-xl">
            <p className="eyebrow">Next step</p>
            <h2 className="font-display mt-3 text-3xl tracking-[-0.03em] sm:text-4xl md:text-5xl">
              {homeCopy.ctaTitle}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-bark-soft">{homeCopy.ctaSupport}</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-0 md:flex-col">
            <Link href="/contact" className="btn-dwell btn-signal px-5 py-3">
              Start your quote
            </Link>
            <a href={contact.phoneHref} className="btn-dwell btn-ghost px-5 py-3">
              Call {contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

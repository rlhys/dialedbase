import Link from "next/link";
import { contact, homeCopy } from "@/content/site";

export function CtaBand() {
  return (
    <section className="bg-signal text-ink">
      <div className="site-shell flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center md:py-14">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl tracking-[-0.03em] sm:text-4xl">{homeCopy.ctaTitle}</h2>
          <p className="mt-3 text-lg leading-relaxed">{homeCopy.ctaSupport}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className="btn-solid bg-ink px-5 py-3 text-paper hover:bg-ink-soft">
            Start your quote
          </Link>
          <a href={contact.phoneHref} className="btn-solid border border-ink bg-transparent px-5 py-3 text-ink hover:bg-ink hover:text-paper">
            Call {contact.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}

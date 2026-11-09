import Link from "next/link";
import { contact, homeCopy } from "@/content/site";
import { Reveal } from "@/components/Reveal";

export function CtaBand() {
  return (
    <section className="site-shell py-16 md:py-20">
      <Reveal className="relative overflow-hidden rounded-[1.5rem] bg-ink px-6 py-10 text-paper sm:px-10 md:px-14 md:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-signal/30 blur-3xl"
        />
        <div className="relative grid gap-8 md:grid-cols-[1.4fr_auto] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-signal">Next step</p>
            <h2 className="font-display mt-3 text-3xl tracking-tight sm:text-4xl md:text-5xl">
              {homeCopy.ctaTitle}
            </h2>
            <p className="mt-4 max-w-xl text-lg text-paper/75">{homeCopy.ctaSupport}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-signal px-5 py-3 text-base font-semibold text-ink transition hover:bg-signal-deep hover:text-paper"
            >
              Start your quote
            </Link>
            <a
              href={contact.phoneHref}
              className="inline-flex items-center justify-center rounded-md border border-paper/30 px-5 py-3 text-base font-semibold text-paper transition hover:border-paper"
            >
              Call {contact.phoneDisplay}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

import Link from "next/link";
import { Magnetic } from "@/components/Motion";
import { site } from "@/content/site";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="hidden pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 py-16 sm:px-8 md:flex-row md:items-center md:py-20">
        <div className="max-w-xl">
          <h2 className="display text-3xl sm:text-5xl">
            <span className="text-inherit">Ready when you are</span>
          </h2>
          <p className="mt-4 text-white/65">
            Call for a straight answer, or send a quote with your from/to details.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Magnetic>
            <a
              href={`tel:${site.phoneTel}`}
              className="inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-5 pr-1.5 text-sm font-semibold text-ink no-underline"
            >
              Call {site.phoneDisplay}
              <span className="grid h-8 w-8 place-items-center rounded-full bg-signal text-white">
                →
              </span>
            </a>
          </Magnetic>
          <Magnetic strength={0.16}>
            <Link
              href="/contact"
              className="border border-white/25 bg-black/45 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-white no-underline hover:bg-white/10"
            >
              Get a quote
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

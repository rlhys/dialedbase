import Link from "next/link";
import { site } from "@/content/site";

export function CtaBand({
  title = "Ready when you are",
  body = "Call for a straight answer, or send a quote request with your from/to details.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-ink text-chalk">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 py-16 sm:px-8 md:flex-row md:items-center">
        <div className="max-w-xl">
          <h2 className="display text-3xl sm:text-4xl">{title}</h2>
          <p className="mt-3 text-white/70">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={`tel:${site.phoneTel}`}
            className="cta-pulse rounded-md bg-signal px-5 py-3 text-center text-sm font-semibold text-chalk no-underline hover:bg-signal-deep"
          >
            Call {site.phoneDisplay}
          </a>
          <Link
            href="/contact"
            className="rounded-md border border-white/25 px-5 py-3 text-center text-sm font-semibold text-chalk no-underline hover:bg-white/5"
          >
            Get a quote
          </Link>
        </div>
      </div>
    </section>
  );
}

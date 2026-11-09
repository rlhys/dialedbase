import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { Magnetic } from "@/components/Magnetic";
import { site } from "@/content/site";

export function CtaBand({
  title = "Ready when you are",
  body = "Call for a straight answer, or send a quote request with your from/to details.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 80% at 100% 50%, color-mix(in srgb, var(--signal) 28%, transparent), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 px-5 py-20 sm:px-8 md:flex-row md:items-center">
        <div className="max-w-xl">
          <BrandLogo tone="chalk" height={32} href={null} className="mb-6 opacity-90" />
          <h2 className="display text-3xl sm:text-4xl md:text-5xl">{title}</h2>
          <p className="mt-4 text-white/65">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Magnetic>
            <a
              href={`tel:${site.phoneTel}`}
              className="cta-pulse inline-flex rounded-sm bg-signal px-6 py-3.5 text-center text-sm font-semibold text-white no-underline hover:bg-signal-deep"
            >
              Call {site.phoneDisplay}
            </a>
          </Magnetic>
          <Magnetic strength={0.16}>
            <Link
              href="/contact"
              className="inline-flex rounded-sm border border-white/25 px-6 py-3.5 text-center text-sm font-semibold text-white no-underline hover:bg-white/8"
            >
              Get a quote
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

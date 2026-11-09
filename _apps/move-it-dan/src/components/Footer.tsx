import Link from "next/link";
import { DialedbaseCredit } from "@/components/DialedbaseCredit";
import { BrandLogo } from "@/components/BrandLogo";
import { Motif } from "@/components/Motif";
import { nav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <BrandLogo tone="chalk" height={40} />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
            {site.summary}
          </p>
        </div>
        <div>
          <p className="condensed flex items-center gap-2 text-[0.7rem] text-signal">
            <Motif tone="chalk" size={14} />
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/75 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="condensed flex items-center gap-2 text-[0.7rem] text-signal">
            <Motif tone="chalk" size={14} />
            Get in touch
          </p>
          <a
            href={`tel:${site.phoneTel}`}
            className="mt-4 block text-2xl font-semibold tracking-tight text-white no-underline"
          >
            {site.phoneDisplay}
          </a>
          <p className="mt-3 text-sm text-white/55">
            Free quotes for domestic, commercial, packing, and overseas moves.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex rounded-sm bg-signal px-4 py-2.5 text-sm font-semibold text-white no-underline hover:bg-signal-deep"
          >
            Request a quote
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-white/40">© 2026 {site.name}</p>
          <DialedbaseCredit />
        </div>
      </div>
    </footer>
  );
}

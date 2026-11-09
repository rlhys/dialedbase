import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { DialedbaseCredit } from "@/components/DialedbaseCredit";
import { nav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandLogo tone="chalk" height={34} />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
            {site.summary}
          </p>
        </div>
        <div>
          <p className="eyebrow text-signal">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/75 no-underline hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-signal">Get in touch</p>
          <a
            href={`tel:${site.phoneTel}`}
            className="mt-4 block text-2xl font-semibold tracking-tight text-white no-underline"
          >
            {site.phoneDisplay}
          </a>
          <Link
            href="/contact"
            className="mt-5 inline-flex rounded-md bg-signal px-4 py-2.5 text-sm font-semibold text-white no-underline hover:bg-signal-deep"
          >
            Request a quote
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-white/45">© 2026 {site.name}</p>
          <DialedbaseCredit />
        </div>
      </div>
    </footer>
  );
}

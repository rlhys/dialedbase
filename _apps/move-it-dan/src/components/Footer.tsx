import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { DialedbaseCredit } from "@/components/DialedbaseCredit";
import { nav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-ink bg-ink text-white">
      <div className="site-shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandLogo tone="chalk" height={34} />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">
            {site.summary}
          </p>
        </div>
        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-white/75 no-underline transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Get in touch</p>
          <a
            href={`tel:${site.phoneTel}`}
            className="display mt-4 block text-3xl tracking-tight text-white no-underline transition-colors hover:text-signal"
          >
            {site.phoneDisplay}
          </a>
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
            <a href={site.whatsapp} className="text-white no-underline hover:text-signal">
              WhatsApp
            </a>
            <a href={site.facebook} className="text-white no-underline hover:text-signal" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href={site.instagram} className="text-white no-underline hover:text-signal" target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
          <Link href="/contact" className="btn btn-signal mt-6">
            Request a quote
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="site-shell flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">
          <p className="text-xs text-white/45">© 2026 {site.name}</p>
          <DialedbaseCredit />
        </div>
      </div>
    </footer>
  );
}

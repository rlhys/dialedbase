import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-chalk">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="inline-flex rounded-sm bg-chalk px-3 py-2">
            <Image
              src="/logo.jpg"
              alt={site.name}
              width={220}
              height={58}
              className="h-10 w-auto"
            />
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            {site.summary}
          </p>
        </div>
        <div>
          <p className="condensed text-[0.7rem] text-signal">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/80 hover:text-chalk">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="condensed text-[0.7rem] text-signal">Get in touch</p>
          <a
            href={`tel:${site.phoneTel}`}
            className="mt-4 block text-2xl font-semibold tracking-tight text-chalk no-underline"
          >
            {site.phoneDisplay}
          </a>
          <p className="mt-3 text-sm text-white/65">
            Free quotes for domestic, commercial, packing, and overseas moves.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex rounded-md bg-signal px-4 py-2.5 text-sm font-semibold text-chalk no-underline hover:bg-signal-deep"
          >
            Request a quote
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/45 sm:px-8">
        © 2026 {site.name}. Site by Dialedbase.
      </div>
    </footer>
  );
}

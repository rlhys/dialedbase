import Image from "next/image";
import Link from "next/link";
import { brand, contact, nav, areas } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-ink text-paper">
      <div className="site-shell grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="relative h-11 w-56">
            <Image
              src="/images/logo-wordmark.png"
              alt={brand.name}
              fill
              className="object-contain object-left"
              sizes="224px"
            />
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-signal">
            {brand.motto}
          </p>
          <p className="mt-3 max-w-sm text-base leading-relaxed text-paper/75">{brand.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={contact.phoneHref}
              className="rounded-md bg-signal px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-signal-deep hover:text-paper"
            >
              Call {contact.phoneDisplay}
            </a>
            <a
              href={contact.emailHref}
              className="rounded-md border border-paper/25 px-4 py-2.5 text-sm font-semibold text-paper transition hover:border-paper/60"
            >
              Email us
            </a>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-paper/55">Explore</p>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-paper/85 transition hover:text-signal">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-paper/55">Contact</p>
          <ul className="mt-4 space-y-2 text-paper/85">
            <li>
              <a href={contact.phoneHref} className="hover:text-signal">
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={contact.mobileHref} className="hover:text-signal">
                {contact.mobileDisplay}
              </a>
            </li>
            <li>
              <a href={contact.emailHref} className="hover:text-signal">
                {contact.email}
              </a>
            </li>
          </ul>
          <p className="mt-5 text-sm text-paper/55">
            Serving {areas.hub} and nearby towns including {areas.places.slice(1, 4).join(", ")}.
          </p>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="site-shell flex flex-col gap-2 py-5 text-sm text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {brand.name}. All rights reserved.</p>
          <p>Built by Dialedbase for Site Care readiness.</p>
        </div>
      </div>
    </footer>
  );
}

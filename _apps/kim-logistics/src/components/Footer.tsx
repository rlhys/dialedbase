import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { DialedbaseCredit } from "@/components/DialedbaseCredit";
import { MotionHashes } from "@/components/MotionHashes";
import { areas, brand, contact, nav } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-paper">
      <div className="site-shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandLogo variant="chalk" className="h-12 w-60" sizes="240px" />
          <div className="mt-6 flex items-center gap-3">
            <span className="h-px w-10 bg-signal" />
            <MotionHashes tone="signal" />
          </div>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-paper/72">{brand.tagline}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={contact.phoneHref} className="btn-solid btn-signal px-4 py-2.5 text-sm">
              Call {contact.phoneDisplay}
            </a>
            <a href={contact.emailHref} className="btn-solid btn-ghost-chalk px-4 py-2.5 text-sm">
              Email us
            </a>
          </div>
        </div>

        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.24em] text-paper/45">Explore</p>
          <ul className="mt-5 space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-paper/85 transition-colors hover:text-signal">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.24em] text-paper/45">Contact</p>
          <ul className="mt-5 space-y-2.5 text-paper/85">
            <li>
              <a href={contact.phoneHref} className="transition-colors hover:text-signal">
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={contact.mobileHref} className="transition-colors hover:text-signal">
                {contact.mobileDisplay}
              </a>
            </li>
            <li>
              <a href={contact.emailHref} className="transition-colors hover:text-signal">
                {contact.email}
              </a>
            </li>
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-paper/50">
            Serving {areas.hub} and nearby towns including {areas.places.slice(1, 4).join(", ")}.
          </p>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="site-shell flex flex-col gap-3 py-5 text-sm text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {brand.name}. All rights reserved.</p>
          <DialedbaseCredit />
        </div>
      </div>
    </footer>
  );
}

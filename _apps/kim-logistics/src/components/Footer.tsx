import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { DialedbaseCredit } from "@/components/DialedbaseCredit";
import { areas, brand, contact, nav } from "@/content/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-bark text-chalk">
      <div className="site-shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandLogo variant="chalk" className="h-12 w-60" sizes="240px" />
          <p className="mt-5 max-w-sm text-base leading-relaxed text-chalk/70">{brand.tagline}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={contact.phoneHref} className="btn-dwell btn-signal">
              Call {contact.phoneDisplay}
            </a>
            <a href={contact.emailHref} className="btn-dwell btn-ghost-chalk">
              Email us
            </a>
          </div>
          <a
            href={contact.facebook}
            className="font-mono-ui mt-5 inline-flex text-[0.7rem] text-sky"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
        </div>

        <div>
          <p className="font-mono-ui text-[0.68rem] text-chalk/45">Explore</p>
          <ul className="mt-5 space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-chalk/85 transition-colors hover:text-sky">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono-ui text-[0.68rem] text-chalk/45">Contact</p>
          <ul className="mt-5 space-y-2.5 text-chalk/85">
            <li>
              <a href={contact.phoneHref} className="transition-colors hover:text-sky">
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={contact.mobileHref} className="transition-colors hover:text-sky">
                {contact.mobileDisplay}
              </a>
            </li>
            <li>
              <a href={contact.emailHref} className="transition-colors hover:text-sky">
                {contact.email}
              </a>
            </li>
          </ul>
          <p className="font-mono-ui mt-6 text-[0.68rem] text-chalk/45">Hours</p>
          <ul className="mt-3 space-y-1 text-sm text-chalk/75">
            {contact.hours.map((row) => (
              <li key={row.label}>
                {row.label}: {row.value}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-chalk/50">
            Serving {areas.hub} and nearby towns including {areas.places.slice(1, 4).join(", ")}.
          </p>
        </div>
      </div>
      <div className="border-t border-chalk/10">
        <div className="site-shell flex flex-col gap-3 py-5 text-sm text-chalk/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {brand.name}. All rights reserved.</p>
          <DialedbaseCredit />
        </div>
      </div>
    </footer>
  );
}

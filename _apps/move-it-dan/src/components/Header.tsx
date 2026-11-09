"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { nav, site } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = nav.filter((item) => item.href !== "/");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-4 border-signal bg-paper">
      <div className="site-shell flex items-center justify-between gap-4 py-3.5">
        <BrandLogo tone="ink" height={28} priority onClick={() => setOpen(false)} />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-semibold no-underline ${
                  active ? "text-signal" : "text-ink hover:text-signal"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a href={`tel:${site.phoneTel}`} className="btn btn-signal ml-2 !px-3.5 !py-2 text-sm">
            {site.phoneDisplay}
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex items-center border border-ink/20 px-3 py-2 text-sm font-semibold text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-paper lg:hidden">
          <nav className="site-shell flex flex-col py-2" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-1 py-3 text-base font-semibold text-ink no-underline"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a href={`tel:${site.phoneTel}`} className="btn btn-signal my-2">
              Call {site.phoneDisplay}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

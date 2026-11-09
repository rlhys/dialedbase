"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { brand, contact, nav } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-4 border-signal bg-paper">
      <div className="site-shell flex items-center justify-between gap-4 py-3">
        <Link href="/" aria-label={`${brand.name} home`} className="flex min-w-0 items-center">
          <BrandLogo variant="ink" priority className="h-8 w-[8.25rem] sm:h-10 sm:w-[12rem]" sizes="192px" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav
            .filter((item) => item.href !== "/")
            .map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-semibold ${
                    active ? "text-signal" : "text-ink hover:text-signal"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={contact.phoneHref}
            className="hidden text-sm font-semibold text-ink md:inline"
          >
            {contact.phoneDisplay}
          </a>
          <Link href="/contact" className="btn-solid btn-signal px-3.5 py-2 text-sm">
            Free quote
          </Link>
          <button
            type="button"
            className="inline-flex h-10 items-center border border-ink/20 px-3 text-sm font-semibold lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-[var(--line)] bg-paper lg:hidden">
          <nav className="site-shell flex flex-col py-2" aria-label="Mobile">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="py-3 text-base font-semibold text-ink">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

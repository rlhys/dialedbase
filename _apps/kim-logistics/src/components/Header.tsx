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
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="site-shell flex items-center justify-between gap-4 py-4 md:py-5">
        <Link
          href="/"
          aria-label={`${brand.name} home`}
          className="rounded-full bg-chalk/80 px-3 py-2 backdrop-blur-sm"
        >
          <BrandLogo
            variant="ink"
            priority
            className="h-8 w-[8.5rem] sm:h-9 sm:w-[10.5rem]"
            sizes="168px"
          />
        </Link>

        <nav
          className="hidden items-center gap-1 rounded-full border border-[var(--line)] bg-chalk/85 px-2 py-1.5 backdrop-blur-sm lg:flex"
          aria-label="Primary"
        >
          {nav
            .filter((item) => item.href !== "/")
            .map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-mono-ui rounded-full px-3.5 py-2 text-[0.7rem] transition-colors ${
                    active
                      ? "bg-bark text-chalk"
                      : "text-bark-soft hover:bg-chalk-deep"
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
            className="font-mono-ui hidden rounded-full border border-[var(--line)] bg-chalk/85 px-3.5 py-2.5 text-[0.7rem] text-bark backdrop-blur-sm md:inline-flex"
          >
            {contact.phoneDisplay}
          </a>
          <Link href="/contact" className="btn-dwell btn-signal">
            Free quote
          </Link>
          <button
            type="button"
            className="font-mono-ui inline-flex h-10 items-center rounded-full border border-[var(--line)] bg-chalk/85 px-3 text-[0.7rem] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-[var(--line)] bg-chalk/95 backdrop-blur-sm lg:hidden"
        >
          <nav className="site-shell flex flex-col py-3" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono-ui py-3 text-sm text-bark"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}

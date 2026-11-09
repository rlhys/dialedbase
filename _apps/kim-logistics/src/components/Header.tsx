"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { brand, contact, nav } from "@/content/site";
import { cx } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(250,250,250,0.92)] backdrop-blur-md">
      <div className="site-shell flex items-center justify-between gap-4 py-3">
        <Link
          href="/"
          className="relative block h-10 w-[11.5rem] shrink-0 sm:h-11 sm:w-[14rem]"
          onClick={() => setOpen(false)}
          aria-label={brand.name}
        >
          <Image
            src="/images/logo-wordmark-ink.png"
            alt={brand.name}
            fill
            className="object-contain object-left"
            sizes="224px"
            priority
          />
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
                  className={cx(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-ink text-white"
                      : "text-ink/80 hover:bg-field-deep/60 hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={contact.phoneHref}
            className="hidden rounded-md border border-ink/15 px-3 py-2 text-sm font-semibold text-ink transition hover:border-ink/35 md:inline-flex"
          >
            {contact.phoneDisplay}
          </a>
          <Link
            href="/contact"
            className="inline-flex rounded-md bg-signal px-3.5 py-2 text-sm font-semibold text-ink transition hover:bg-signal-deep hover:text-paper"
          >
            Free quote
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-ink/15 text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className="flex flex-col gap-1.5">
              <span className={cx("block h-0.5 w-5 bg-current transition", open && "translate-y-2 rotate-45")} />
              <span className={cx("block h-0.5 w-5 bg-current transition", open && "opacity-0")} />
              <span className={cx("block h-0.5 w-5 bg-current transition", open && "-translate-y-2 -rotate-45")} />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cx("border-t border-[var(--line)] bg-paper lg:hidden", open ? "block" : "hidden")}
      >
        <nav className="site-shell flex flex-col gap-1 py-3" aria-label="Mobile">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cx(
                  "rounded-md px-3 py-3 text-base font-medium",
                  active ? "bg-ink text-paper" : "text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

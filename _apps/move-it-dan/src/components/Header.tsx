"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <Link
          href="/"
          className="display text-xl tracking-tight text-white no-underline drop-shadow-sm sm:text-2xl"
          onClick={() => setOpen(false)}
        >
          {site.name}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm no-underline transition-colors ${
                  active
                    ? "bg-white/10 text-chalk"
                    : "text-white/75 hover:bg-white/5 hover:text-chalk"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={`tel:${site.phoneTel}`}
            className="ml-2 rounded-md bg-signal px-3.5 py-2 text-sm font-semibold text-chalk no-underline transition hover:bg-signal-deep"
          >
            Call {site.phoneDisplay}
          </a>
        </nav>

        <button
          type="button"
          className="inline-flex items-center rounded-md border border-white/25 px-3 py-2 text-sm text-chalk lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-white/10 bg-ink/95 px-5 py-4 backdrop-blur-md lg:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 text-base text-chalk no-underline hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:${site.phoneTel}`}
              className="mt-2 rounded-md bg-signal px-3 py-3 text-center font-semibold text-chalk no-underline"
              onClick={() => setOpen(false)}
            >
              Call {site.phoneDisplay}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { nav, site } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(pathname !== "/");

  useEffect(() => {
    if (pathname !== "/") {
      setSolid(true);
      return;
    }
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const links = nav.filter((item) => item.href !== "/");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color,box-shadow] duration-300 ${
        solid || open
          ? "border-b border-line bg-paper/95 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <BrandLogo
          tone={solid || open ? "ink" : "chalk"}
          height={30}
          priority
          onClick={() => setOpen(false)}
        />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {links.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium no-underline transition-colors ${
                  active
                    ? solid || open
                      ? "bg-ink text-white"
                      : "bg-white/15 text-white"
                    : solid || open
                      ? "text-ink/70 hover:bg-ink/5 hover:text-ink"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={`tel:${site.phoneTel}`}
            className="ml-2 rounded-md bg-signal px-3.5 py-2 text-sm font-semibold text-white no-underline transition hover:bg-signal-deep"
          >
            Call {site.phoneDisplay}
          </a>
        </nav>

        <button
          type="button"
          className={`inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium lg:hidden ${
            solid || open
              ? "border-ink/20 text-ink"
              : "border-white/35 text-white"
          }`}
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
          className="border-t border-line bg-paper px-5 py-4 lg:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 text-base text-ink no-underline hover:bg-ink/5"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:${site.phoneTel}`}
              className="mt-2 rounded-md bg-signal px-3 py-3 text-center font-semibold text-white no-underline"
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

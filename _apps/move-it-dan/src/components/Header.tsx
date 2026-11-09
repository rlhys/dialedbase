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
    const onScroll = () => setSolid(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const links = nav.filter((item) => item.href !== "/");
  const inverted = !(solid || open);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color,box-shadow] duration-300 ${
        solid || open
          ? "border-b border-line bg-paper shadow-[0_1px_0_rgba(12,21,32,0.04)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="site-shell flex items-center justify-between gap-4 py-4">
        <BrandLogo
          tone={inverted ? "chalk" : "ink"}
          height={30}
          priority
          onClick={() => setOpen(false)}
        />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-sm px-3 py-2 text-sm font-medium no-underline transition-colors ${
                  active
                    ? inverted
                      ? "bg-white/15 text-white"
                      : "bg-ink text-white"
                    : inverted
                      ? "text-white/80 hover:text-white"
                      : "text-ink/70 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={`tel:${site.phoneTel}`}
            className="btn btn-signal ml-2 !px-3.5 !py-2 text-sm"
          >
            Call {site.phoneDisplay}
          </a>
        </nav>

        <button
          type="button"
          className={`inline-flex items-center rounded-sm border px-3 py-2 text-sm font-medium lg:hidden ${
            inverted
              ? "border-white/40 text-white"
              : "border-ink/20 text-ink"
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
          <nav className="site-shell flex flex-col gap-1 !w-full" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-sm px-3 py-3 text-base text-ink no-underline hover:bg-field"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:${site.phoneTel}`}
              className="btn btn-signal mt-2"
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

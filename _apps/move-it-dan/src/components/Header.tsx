"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const links = nav.filter((item) => item.href !== "/");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background,border-color,backdrop-filter] ${
        solid
          ? "border-b border-line bg-paper/95 text-ink backdrop-blur-md"
          : "border-b border-transparent bg-transparent text-chalk"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="relative block h-8 w-[10.5rem] shrink-0 sm:h-9 sm:w-[12.5rem]"
          onClick={() => setOpen(false)}
          aria-label={site.name}
        >
          <Image
            src={solid ? "/logo-ink.png" : "/logo-chalk.png"}
            alt={site.name}
            fill
            priority
            className="object-contain object-left"
            sizes="200px"
          />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {links.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-2.5 py-2 text-sm no-underline transition-colors ${
                  active
                    ? solid
                      ? "bg-ink text-chalk"
                      : "bg-white/10 text-chalk"
                    : solid
                      ? "text-ink/70 hover:bg-ink/5 hover:text-ink"
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
          className={`inline-flex items-center rounded-md border px-3 py-2 text-sm lg:hidden ${
            solid ? "border-ink/20 text-ink" : "border-white/25 text-chalk"
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
          className={`border-t px-5 py-4 lg:hidden ${
            solid
              ? "border-line bg-paper"
              : "border-white/10 bg-ink/95 backdrop-blur-md"
          }`}
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-3 text-base no-underline ${
                  solid ? "text-ink hover:bg-ink/5" : "text-chalk hover:bg-white/5"
                }`}
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

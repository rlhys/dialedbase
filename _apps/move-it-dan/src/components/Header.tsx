"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { nav, site } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    // Lenis drives scroll via transform; also listen to its virtual scroll via rAF poll of scrollY
    const id = window.setInterval(onScroll, 200);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearInterval(id);
    };
  }, []);

  const solid = scrolled || open;
  // Dark floating bar + chalk logo after scroll so the mark stays readable on any section.
  // Transparent over dark heroes at the top of the page.
  const linkIdle = solid
    ? "text-white/70 hover:text-white"
    : "text-white/80 hover:text-white";
  const linkActive = "text-white";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        className={`mx-auto transition-[background,box-shadow,backdrop-filter,border-color] duration-300 ${
          solid
            ? "border-b border-white/10 bg-black/85 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
        initial={false}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <BrandLogo
            tone="chalk"
            height={32}
            priority
            onClick={() => setOpen(false)}
          />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav
              .filter((item) => item.href !== "/")
              .map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-sm px-3 py-2 text-sm font-medium no-underline transition-colors ${
                      active ? linkActive : linkIdle
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            <a
              href={`tel:${site.phoneTel}`}
              className="ml-2 rounded-sm bg-signal px-3.5 py-2 text-sm font-semibold text-white no-underline transition hover:bg-signal-deep"
            >
              Call {site.phoneDisplay}
            </a>
          </nav>

          <button
            type="button"
            className="inline-flex items-center rounded-sm border border-white/30 px-3 py-2 text-sm font-medium text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              id="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-white/10 bg-black lg:hidden"
            >
              <nav className="flex flex-col gap-1 px-5 py-4" aria-label="Mobile">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-sm px-3 py-3 text-base text-white no-underline hover:bg-white/5"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href={`tel:${site.phoneTel}`}
                  className="mt-2 rounded-sm bg-signal px-3 py-3 text-center font-semibold text-white no-underline"
                  onClick={() => setOpen(false)}
                >
                  Call {site.phoneDisplay}
                </a>
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}

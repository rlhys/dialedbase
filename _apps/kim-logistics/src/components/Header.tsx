"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { Magnetic } from "@/components/Motion";
import { brand, contact, nav } from "@/content/site";
import { cx } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [overDark, setOverDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("brand-hero");

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 18);

      if (hero) {
        const bottom = hero.getBoundingClientRect().bottom;
        setOverDark(bottom > 88);
        return;
      }

      setOverDark(y < 220);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  const dark = overDark || open;
  const logoVariant = dark ? "chalk" : "ink";

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300",
        dark
          ? scrolled || open
            ? "border-b border-white/10 bg-ink/92 backdrop-blur-md"
            : "border-b border-transparent bg-ink/35 backdrop-blur-sm"
          : "border-b border-[var(--line)] bg-paper/95 backdrop-blur-md shadow-[0_1px_0_rgba(9,9,9,0.04)]",
      )}
    >
      <div className="site-shell flex items-center justify-between gap-4 py-3.5">
        <Link
          href="/"
          className="group flex min-w-0 items-center"
          onClick={() => setOpen(false)}
          aria-label={`${brand.name} home`}
        >
          <BrandLogo
            variant={logoVariant}
            priority
            className="h-9 w-[9.75rem] sm:h-10 sm:w-[11.5rem]"
            sizes="184px"
          />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {nav
            .filter((item) => item.href !== "/")
            .map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    "px-3 py-2 text-[0.92rem] font-medium tracking-tight transition-colors",
                    dark
                      ? active
                        ? "text-paper"
                        : "text-paper/70 hover:text-paper"
                      : active
                        ? "text-ink"
                        : "text-ink/65 hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
        </nav>

        <div className="flex items-center gap-2">
          <Magnetic strength={0.16} className="hidden md:inline-flex">
            <a
              href={contact.phoneHref}
              className={cx(
                "inline-flex px-3 py-2 text-sm font-semibold tracking-tight transition",
                dark
                  ? "border border-paper/25 text-paper hover:border-paper/60"
                  : "border border-ink/15 text-ink hover:border-ink/40",
              )}
            >
              {contact.phoneDisplay}
            </a>
          </Magnetic>
          <Magnetic strength={0.22}>
            <Link
              href="/contact"
              className="inline-flex bg-signal px-3.5 py-2 text-sm font-semibold tracking-tight text-ink transition hover:bg-signal-deep hover:text-paper"
            >
              Free quote
            </Link>
          </Magnetic>
          <button
            type="button"
            className={cx(
              "inline-flex h-10 w-10 items-center justify-center border lg:hidden",
              dark ? "border-paper/25 text-paper" : "border-ink/15 text-ink",
            )}
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

      <div id="mobile-nav" className={cx("border-t lg:hidden", open ? "block" : "hidden", dark ? "border-white/10 bg-ink" : "border-[var(--line)] bg-paper")}>
        <nav className="site-shell flex flex-col gap-1 py-3" aria-label="Mobile">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cx(
                  "px-3 py-3 text-base font-medium",
                  dark
                    ? active
                      ? "bg-paper text-ink"
                      : "text-paper"
                    : active
                      ? "bg-ink text-paper"
                      : "text-ink",
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

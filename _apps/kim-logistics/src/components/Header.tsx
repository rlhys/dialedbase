"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { brand, contact, nav } from "@/content/site";
import { cx } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [overHero, setOverHero] = useState(true);

  useEffect(() => {
    const hero = document.getElementById("brand-hero");

    const update = () => {
      if (hero) {
        setOverHero(hero.getBoundingClientRect().bottom > 72);
        return;
      }
      setOverHero(window.scrollY < 160);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const dark = overHero || open;
  const logoVariant = dark ? "chalk" : "ink";

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-200",
        dark
          ? "border-white/10 bg-ink"
          : "border-[var(--line)] bg-paper",
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
          <a
            href={contact.phoneHref}
            className={cx(
              "hidden px-3 py-2 text-sm font-semibold tracking-tight transition md:inline-flex",
              dark
                ? "border border-paper/25 text-paper hover:border-paper/60"
                : "border border-ink/15 text-ink hover:border-ink/40",
            )}
          >
            {contact.phoneDisplay}
          </a>
          <Link href="/contact" className="btn-solid btn-signal px-3.5 py-2 text-sm">
            Free quote
          </Link>
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

      <div
        id="mobile-nav"
        className={cx(
          "border-t lg:hidden",
          open ? "block" : "hidden",
          dark ? "border-white/10 bg-ink" : "border-[var(--line)] bg-paper",
        )}
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
                  "px-3 py-3 text-base font-medium transition-colors",
                  dark
                    ? active
                      ? "bg-paper text-ink"
                      : "text-paper hover:bg-paper/10"
                    : active
                      ? "bg-ink text-paper"
                      : "text-ink hover:bg-field",
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

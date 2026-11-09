"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Magnetic } from "@/components/Motion";
import { MotionHashes } from "@/components/MotionHashes";
import { contact, homeCopy } from "@/content/site";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

/**
 * Brand-first hero: full-bleed fleet photo + headline + motion hashes.
 * Logo lives only in the sticky header (and footer) — never repeated here.
 */
export function HeroStage() {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!root.current || !media.current || !copy.current) return;

      const lines = copy.current.querySelectorAll<HTMLElement>("[data-hero-line]");
      // Clear any leftover opacity from Strict Mode remounts / HMR.
      gsap.set(lines, { clearProps: "opacity,visibility,transform,filter" });
      gsap.set(media.current, { clearProps: "transform" });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(lines, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(media.current, { scale: 1.12 }, { scale: 1.02, duration: 1.7 }, 0)
        .from(
          lines,
          {
            y: 48,
            autoAlpha: 0,
            duration: 0.95,
            stagger: 0.09,
            clearProps: "transform",
          },
          0.12,
        );

      gsap.to(media.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      id="brand-hero"
      ref={root}
      className="relative min-h-[100svh] overflow-hidden bg-ink text-paper"
    >
      <div ref={media} className="absolute inset-0 will-change-transform">
        <Image
          src="/images/fleet.jpg"
          alt="Kim Logistics removal vans ready for a move"
          fill
          priority
          className="object-cover object-[center_38%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(9,9,9,0.9)_0%,rgba(9,9,9,0.68)_44%,rgba(9,9,9,0.22)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(9,9,9,0.9)_0%,transparent_44%)]" />
        {/* Geometric industrial frame — not blue cinematic mist */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/70 to-transparent"
        />
      </div>

      <div
        ref={copy}
        className="site-shell relative flex min-h-[100svh] flex-col justify-end pb-14 pt-28 md:justify-center md:pb-20 md:pt-28"
      >
        <div data-hero-line className="flex items-center gap-4">
          <span className="h-px w-16 bg-signal" />
          <MotionHashes className="hash-pulse" tone="signal" />
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-paper/55">
            Keep it moving
          </p>
        </div>

        <h1
          data-hero-line
          className="font-display mt-7 max-w-3xl text-balance text-[2.15rem] leading-[1.05] tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-[4.1rem]"
        >
          {homeCopy.heroHeadline}
        </h1>

        <p
          data-hero-line
          className="mt-5 max-w-xl text-lg leading-relaxed text-paper/78 md:text-xl"
        >
          {homeCopy.heroSupport}
        </p>

        {/* CTAs outside GSAP opacity lines — avoids stuck blank buttons after HMR/remount */}
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Magnetic>
            <Link
              href="/contact"
              className="btn-sheen inline-flex items-center justify-center bg-signal px-6 py-3.5 text-base font-semibold tracking-tight text-ink transition hover:bg-signal-deep hover:text-paper"
            >
              Get a free quote
            </Link>
          </Magnetic>
          <Magnetic strength={0.18}>
            <a
              href={contact.phoneHref}
              className="glass-lite inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold tracking-tight text-paper transition hover:border-paper/55"
            >
              Call {contact.phoneDisplay}
            </a>
          </Magnetic>
        </div>

        <p
          data-hero-line
          className="mt-8 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-paper/50"
        >
          Coventry · West Midlands · Long-distance when needed
        </p>
      </div>
    </section>
  );
}

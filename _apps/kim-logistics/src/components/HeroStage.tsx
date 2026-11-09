"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { MotionHashes } from "@/components/MotionHashes";
import { brand, contact, homeCopy } from "@/content/site";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

/**
 * Brand-first hero: full-bleed fleet photo + typographic motto.
 * Logo lives only in the sticky header and footer — never repeated here.
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
      gsap.set(lines, { clearProps: "opacity,visibility,transform,filter" });
      gsap.set(media.current, { clearProps: "transform" });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(lines, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(media.current, { scale: 1.08 }, { scale: 1, duration: 1.5 }, 0)
        .from(
          lines,
          {
            y: 40,
            autoAlpha: 0,
            duration: 0.9,
            stagger: 0.08,
            clearProps: "transform",
          },
          0.1,
        );

      gsap.to(media.current, {
        yPercent: 10,
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
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(10,10,10,0.82)_0%,rgba(10,10,10,0.55)_46%,rgba(10,10,10,0.22)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,10,10,0.78)_0%,transparent_45%)]" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/80 to-transparent"
        />
      </div>

      <div
        ref={copy}
        className="site-shell relative flex min-h-[100svh] flex-col justify-end pb-14 pt-28 md:justify-center md:pb-20 md:pt-28"
      >
        <div data-hero-line className="flex items-center gap-4">
          <span className="h-px w-12 bg-signal sm:w-16" />
          <MotionHashes tone="signal" />
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-paper/55">
            Coventry · West Midlands
          </p>
        </div>

        <p
          data-hero-line
          className="font-display mt-7 text-[clamp(2.6rem,9vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.04em] text-paper"
        >
          {brand.motto.toUpperCase()}
        </p>

        <h1
          data-hero-line
          className="font-display mt-5 max-w-2xl text-balance text-xl leading-snug tracking-[-0.02em] text-paper/90 sm:text-2xl md:text-[1.75rem]"
        >
          {homeCopy.heroHeadline}
        </h1>

        <p
          data-hero-line
          className="mt-4 max-w-xl text-base leading-relaxed text-paper/72 md:text-lg"
        >
          {homeCopy.heroSupport}
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link href="/contact" className="btn-solid btn-signal">
            Get a free quote
          </Link>
          <a href={contact.phoneHref} className="btn-solid btn-ghost-chalk">
            Call {contact.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Magnetic } from "@/components/Magnetic";
import { brand, contact, homeCopy } from "@/content/site";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

export function HeroStage() {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!root.current || !media.current || !copy.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        media.current,
        { scale: 1.2, filter: "brightness(0.45) saturate(0.85)" },
        { scale: 1.04, filter: "brightness(0.85) saturate(1)", duration: 1.7 },
        0,
      ).from(
        copy.current.querySelectorAll("[data-hero-line]"),
        { y: 64, opacity: 0, filter: "blur(10px)", duration: 1.05, stagger: 0.09 },
        0.12,
      );

      gsap.to(media.current, {
        yPercent: 16,
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
    <section ref={root} className="relative min-h-[100svh] overflow-hidden bg-ink text-paper">
      <div ref={media} className="absolute inset-0 will-change-transform">
        <Image
          src="/images/fleet.jpg"
          alt="Kim Logistics removal vans ready for a move"
          fill
          priority
          className="object-cover object-[center_35%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/88 to-ink/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/55" />
      </div>

      <div
        ref={copy}
        className="site-shell relative flex min-h-[100svh] flex-col justify-end pb-16 pt-28 md:justify-center md:pb-24 md:pt-24"
      >
        <div data-hero-line className="relative h-12 w-[min(100%,18rem)] sm:h-14 sm:w-[22rem]">
          <Image
            src="/images/logo-wordmark.png"
            alt={brand.name}
            fill
            className="object-contain object-left"
            sizes="360px"
            priority
          />
        </div>
        <p
          data-hero-line
          className="mt-5 text-xs font-semibold uppercase tracking-[0.28em] text-signal"
        >
          {brand.motto}
        </p>
        <div data-hero-line className="mt-4 h-1 w-24 origin-left rounded-full bg-signal" />
        <h1
          data-hero-line
          className="font-display mt-8 max-w-3xl text-balance text-3xl leading-[1.08] tracking-tight sm:text-4xl md:text-5xl lg:text-[3.4rem]"
        >
          {homeCopy.heroHeadline}
        </h1>
        <p
          data-hero-line
          className="mt-5 max-w-xl text-lg leading-relaxed text-paper/80 md:text-xl"
        >
          {homeCopy.heroSupport}
        </p>
        <div data-hero-line className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Magnetic>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-signal px-6 py-3.5 text-base font-semibold text-ink transition hover:bg-signal-deep hover:text-paper"
            >
              Get a free quote
            </Link>
          </Magnetic>
          <Magnetic strength={0.18}>
            <a
              href={contact.phoneHref}
              className="inline-flex items-center justify-center rounded-md border border-paper/35 px-6 py-3.5 text-base font-semibold text-paper transition hover:border-paper"
            >
              Call {contact.phoneDisplay}
            </a>
          </Magnetic>
        </div>
        <p
          data-hero-line
          className="mt-6 text-sm uppercase tracking-[0.18em] text-paper/55"
        >
          Coventry · West Midlands · Long-distance when needed
        </p>
      </div>
    </section>
  );
}

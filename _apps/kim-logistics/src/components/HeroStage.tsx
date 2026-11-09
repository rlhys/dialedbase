"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Magnetic } from "@/components/Magnetic";
import { MotionHashes } from "@/components/MotionHashes";
import { contact, homeCopy } from "@/content/site";
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
        { scale: 1.14 },
        { scale: 1.02, duration: 1.85 },
        0,
      ).from(
        copy.current.querySelectorAll("[data-hero-line]"),
        { y: 56, opacity: 0, duration: 1, stagger: 0.1 },
        0.15,
      );

      gsap.to(media.current, {
        yPercent: 14,
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
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(9,9,9,0.92)_0%,rgba(9,9,9,0.72)_42%,rgba(9,9,9,0.28)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(9,9,9,0.88)_0%,transparent_42%)]" />
      </div>

      <div
        ref={copy}
        className="site-shell relative flex min-h-[100svh] flex-col justify-end pb-14 pt-28 md:justify-center md:pb-20 md:pt-28"
      >
        <div data-hero-line className="mt-8 flex items-center gap-4">
          <span className="h-px w-16 bg-signal" />
          <MotionHashes className="hash-pulse" tone="signal" />
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

        <div data-hero-line className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Magnetic>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-signal px-6 py-3.5 text-base font-semibold tracking-tight text-ink transition hover:bg-signal-deep hover:text-paper"
            >
              Get a free quote
            </Link>
          </Magnetic>
          <Magnetic strength={0.18}>
            <a
              href={contact.phoneHref}
              className="inline-flex items-center justify-center border border-paper/35 px-6 py-3.5 text-base font-semibold tracking-tight text-paper transition hover:border-paper"
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

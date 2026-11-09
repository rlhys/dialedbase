"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { Magnetic } from "@/components/Magnetic";
import { site } from "@/content/site";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

export function HeroStage() {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!root.current || !media.current || !copy.current) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        media.current,
        { scale: 1.22, filter: "brightness(0.45)" },
        { scale: 1.06, filter: "brightness(0.85)", duration: 1.8 },
        0,
      ).from(
        copy.current.querySelectorAll("[data-hero-line]"),
        { y: 64, opacity: 0, filter: "blur(10px)", duration: 1.05, stagger: 0.12 },
        0.2,
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
    <section
      ref={root}
      className="relative min-h-[100svh] overflow-hidden bg-black text-white"
    >
      <div
        ref={media}
        className="absolute inset-0 will-change-transform"
        aria-hidden
      >
        <Image
          src="/placeholders/asset-6.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[center_32%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.42)_42%,rgba(0,0,0,0.78)_100%)]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 55% 45% at 70% 40%, color-mix(in srgb, var(--signal) 22%, transparent), transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-20 pt-28 sm:px-8 sm:pb-24 lg:justify-center lg:pb-28">
        <div ref={copy} className="max-w-3xl">
          <div data-hero-line className="mb-8 sm:mb-10">
            <BrandLogo tone="chalk" height={72} href={null} priority className="hero-logo" />
          </div>

          <h1
            data-hero-line
            className="display max-w-xl text-[clamp(2.1rem,6.5vw,4.25rem)] leading-[0.95] tracking-[-0.03em] text-white"
          >
            {site.tagline}
          </h1>

          <p
            data-hero-line
            className="mt-5 max-w-md text-base leading-relaxed text-white/72 sm:text-lg"
          >
            Careful domestic and commercial moves across the UK and overseas,
            with packing support and clear updates from quote to unload.
          </p>

          <div
            data-hero-line
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Magnetic>
              <Link
                href="/contact"
                className="cta-pulse inline-flex items-center justify-center rounded-sm bg-signal px-6 py-3.5 text-sm font-semibold tracking-wide text-white no-underline hover:bg-signal-deep"
              >
                Get a free quote
              </Link>
            </Magnetic>
            <Magnetic strength={0.16}>
              <a
                href={`tel:${site.phoneTel}`}
                className="inline-flex items-center justify-center rounded-sm border border-white/30 px-6 py-3.5 text-sm font-semibold text-white no-underline hover:bg-white/8"
              >
                Call {site.phoneDisplay}
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}

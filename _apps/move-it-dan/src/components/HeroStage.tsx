"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
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
        { scale: 1.18, filter: "brightness(0.55)" },
        { scale: 1.05, filter: "brightness(1)", duration: 1.6 },
        0,
      ).from(
        copy.current.querySelectorAll("[data-hero-line]"),
        { y: 56, opacity: 0, filter: "blur(8px)", duration: 1, stagger: 0.1 },
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
    <section ref={root} className="relative min-h-[100svh] overflow-hidden bg-ink text-chalk">
      <div ref={media} className="absolute inset-0 will-change-transform" aria-hidden>
        <Image
          src="/placeholders/asset-6.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[center_35%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(7,16,24,0.92)_0%,rgba(12,22,36,0.74)_48%,rgba(12,22,36,0.42)_100%)]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 55% at 78% 42%, color-mix(in srgb, var(--signal) 24%, transparent), transparent 58%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-32 sm:px-8 sm:pb-20 lg:justify-center">
        <div ref={copy} className="max-w-2xl">
          <p
            data-hero-line
            className="display text-[clamp(3rem,10vw,6.2rem)] leading-[0.9] tracking-[-0.04em]"
          >
            {site.name}
          </p>
          <h1
            data-hero-line
            className="mt-5 text-2xl font-medium tracking-tight text-white/95 sm:text-3xl"
          >
            {site.tagline}
          </h1>
          <p
            data-hero-line
            className="mt-4 max-w-md text-base leading-relaxed text-white/70 sm:text-lg"
          >
            Careful domestic and commercial moves across the UK and overseas,
            with packing support and clear updates from quote to unload.
          </p>
          <div data-hero-line className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic>
              <Link
                href="/contact"
                className="cta-pulse inline-flex items-center justify-center rounded-md bg-signal px-5 py-3.5 text-sm font-semibold text-chalk no-underline hover:bg-signal-deep"
              >
                Get a free quote
              </Link>
            </Magnetic>
            <Magnetic strength={0.18}>
              <a
                href={`tel:${site.phoneTel}`}
                className="inline-flex items-center justify-center rounded-md border border-white/25 px-5 py-3.5 text-sm font-semibold text-chalk no-underline hover:bg-white/5"
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

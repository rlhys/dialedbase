"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Magnetic } from "@/components/Magnetic";
import { brand, contact, homeCopy } from "@/content/site";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

/** Split-field hero — deliberately different from Move It Dan's full-bleed cinema. */
export function HeroStage() {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!root.current || !media.current || !copy.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const lines = copy.current.querySelectorAll<HTMLElement>("[data-hero-line]");
      // Never leave opacity stuck after HMR — reset first.
      gsap.set(lines, { clearProps: "opacity,transform,filter" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(lines, {
        y: 28,
        autoAlpha: 0,
        duration: 0.75,
        stagger: 0.07,
        clearProps: "transform",
      }).from(
        media.current,
        { clipPath: "inset(0 0 100% 0)", duration: 1.05, ease: "power4.out" },
        0.12,
      );
    },
    { scope: root, dependencies: [] },
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden border-b border-ink/10 bg-paper text-ink"
    >
      <div className="site-shell grid min-h-[100svh] items-stretch gap-0 pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:pt-0">
        <div
          ref={copy}
          className="flex flex-col justify-center py-12 lg:py-24 lg:pr-10"
        >
          <div
            data-hero-line
            className="relative h-14 w-[min(100%,20rem)] sm:h-16 sm:w-[24rem]"
          >
            <Image
              src="/images/logo-wordmark-ink.png"
              alt={brand.name}
              fill
              priority
              className="object-contain object-left"
              sizes="384px"
            />
          </div>
          <p
            data-hero-line
            className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-signal"
          >
            {brand.motto}
          </p>
          <h1
            data-hero-line
            className="font-display mt-5 max-w-xl text-balance text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.35rem]"
          >
            {homeCopy.heroHeadline}
          </h1>
          <p
            data-hero-line
            className="mt-5 max-w-md text-lg leading-relaxed text-steel"
          >
            {homeCopy.heroSupport}
          </p>
          <div data-hero-line className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-ink px-6 py-3.5 text-base font-semibold text-white transition hover:bg-signal hover:text-ink"
              >
                Get a free quote
              </Link>
            </Magnetic>
            <Magnetic strength={0.18}>
              <a
                href={contact.phoneHref}
                className="inline-flex items-center justify-center rounded-md border border-ink/20 px-6 py-3.5 text-base font-semibold text-ink transition hover:border-ink"
              >
                Call {contact.phoneDisplay}
              </a>
            </Magnetic>
          </div>
          <p
            data-hero-line
            className="mt-8 text-sm uppercase tracking-[0.18em] text-steel"
          >
            Coventry · West Midlands · Long-distance when needed
          </p>
        </div>

        <div
          ref={media}
          className="relative min-h-[22rem] overflow-hidden bg-[#111] lg:min-h-full"
        >
          <Image
            src="/images/fleet.jpg"
            alt="Kim Logistics removal vans ready for a move"
            fill
            priority
            className="object-cover object-[center_35%] grayscale-[0.15]"
            sizes="(max-width: 1024px) 100vw, 48vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="flex items-end justify-between gap-4">
              <p className="max-w-[14rem] text-sm font-medium uppercase tracking-[0.16em] text-white/90">
                Keep it moving
              </p>
              <span aria-hidden className="mb-1 flex gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className="block h-5 w-0.5 rotate-[-28deg] bg-signal"
                    style={{ opacity: 0.45 + i * 0.1 }}
                  />
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

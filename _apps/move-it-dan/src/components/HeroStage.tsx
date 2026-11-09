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
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        media.current,
        { scale: 1.12 },
        { scale: 1.02, duration: 1.8 },
        0,
      ).from(
        copy.current.querySelectorAll("[data-hero-line]"),
        { y: 40, opacity: 0, duration: 0.9, stagger: 0.1 },
        0.2,
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
    <section ref={root} className="relative min-h-[100svh] overflow-hidden bg-ink text-chalk">
      {/* Full-bleed cinematic photo — Move It Dan identity */}
      <div ref={media} className="absolute inset-0 will-change-transform" aria-hidden>
        <Image
          src="/placeholders/crew-boxes.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[center_30%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(7,16,24,0.78)_0%,rgba(12,22,36,0.55)_42%,rgba(12,22,36,0.28)_100%)]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 55% 45% at 72% 40%, color-mix(in srgb, var(--signal) 28%, transparent), transparent 62%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20 lg:justify-end lg:pb-24">
        <div ref={copy} className="max-w-3xl">
          <div data-hero-line className="relative h-[clamp(3rem,9.5vw,5.6rem)] w-[min(100%,34rem)] drop-shadow-[0_8px_28px_rgba(0,0,0,0.45)]">
            <Image
              src="/logo-chalk.png"
              alt={site.name}
              fill
              priority
              className="object-contain object-left"
              sizes="(max-width: 768px) 90vw, 544px"
            />
          </div>
          <h1
            data-hero-line
            className="mt-6 max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
          >
            {site.tagline}
          </h1>
          <p
            data-hero-line
            className="mt-4 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg"
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
                className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/5 px-5 py-3.5 text-sm font-semibold text-chalk no-underline backdrop-blur-sm hover:bg-white/10"
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

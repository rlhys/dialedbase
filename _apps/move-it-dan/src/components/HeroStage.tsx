"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Magnetic } from "@/components/Motion";
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
        gsap.set([media.current, copy.current.querySelectorAll("[data-hero-line]")], {
          clearProps: "all",
          autoAlpha: 1,
        });
        return;
      }

      const lines = copy.current.querySelectorAll<HTMLElement>("[data-hero-line]");
      gsap.set(lines, { clearProps: "opacity,visibility,transform,filter" });

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(media.current, { scale: 1.1 }, { scale: 1, duration: 1.7 }, 0)
        .from(
          lines,
          {
            y: 32,
            autoAlpha: 0,
            duration: 0.85,
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
    <section ref={root} className="relative min-h-[94svh] overflow-hidden bg-ink text-white">
      <div ref={media} className="absolute inset-0 will-change-transform" aria-hidden>
        <Image
          src="/placeholders/crew-boxes.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[center_28%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(16,24,32,0.88)_0%,rgba(16,24,32,0.58)_48%,rgba(0,115,197,0.22)_100%)]" />
        <div className="pointer-events-none absolute inset-0 signal-glow opacity-70" />
      </div>

      <div className="relative mx-auto flex min-h-[94svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20 lg:justify-center">
        <div ref={copy} className="max-w-2xl">
          <div data-hero-line>
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-medium tracking-wide text-white/85">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              UK & overseas removals
            </span>
          </div>

          <h1
            data-hero-line
            className="display mt-6 text-[clamp(2.75rem,8.5vw,5rem)] leading-[0.94]"
          >
            <span className="shine-text">{site.tagline}</span>
          </h1>

          <p
            data-hero-line
            className="mt-5 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg"
          >
            Careful domestic and commercial moves with packing support and clear
            updates from quote to unload.
          </p>

          <div data-hero-line className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic strength={0.25}>
              <Link
                href="/contact"
                className="btn-sheen inline-flex items-center justify-center rounded-full bg-signal px-6 py-3.5 text-sm font-semibold text-white no-underline shadow-[0_12px_40px_-16px_rgba(0,115,197,0.9)] hover:bg-signal-deep"
              >
                Get a free quote
              </Link>
            </Magnetic>
            <Magnetic strength={0.16}>
              <a
                href={`tel:${site.phoneTel}`}
                className="glass glass-hover inline-flex items-center justify-center rounded-full px-5 py-3.5 text-sm font-semibold text-white no-underline hover:bg-white/10"
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

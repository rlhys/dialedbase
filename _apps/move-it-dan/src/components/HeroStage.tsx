"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { photos, site, trustPoints } from "@/content/site";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

/**
 * Brand-first full-bleed hero. Logo lives only in header + footer.
 * Scraped job photo, solid overlay, calm CTAs - no glass / shine / magnetic.
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
            y: 28,
            autoAlpha: 0,
            duration: 0.8,
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
      ref={root}
      className="relative min-h-[100svh] overflow-hidden bg-ink text-white"
    >
      <div ref={media} className="absolute inset-0 will-change-transform" aria-hidden>
        <Image
          src={photos.hero.src}
          alt=""
          fill
          priority
          className="object-cover object-[center_35%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(12,21,32,0.88)_0%,rgba(12,21,32,0.62)_46%,rgba(12,21,32,0.35)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,21,32,0.78)_0%,transparent_42%)]" />
      </div>

      <div className="site-shell relative flex min-h-[100svh] flex-col justify-end pb-14 pt-28 md:justify-center md:pb-20">
        <div ref={copy} className="max-w-2xl">
          <p
            data-hero-line
            className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/70"
          >
            UK &amp; overseas removals
          </p>

          <h1
            data-hero-line
            className="display mt-5 text-[clamp(3rem,10vw,5.75rem)] leading-[0.92] text-white"
          >
            {site.tagline}
          </h1>

          <p
            data-hero-line
            className="mt-5 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg"
          >
            Careful domestic and commercial moves with packing support and clear
            updates from quote to unload.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/contact" className="btn btn-signal">
              Get a free quote
            </Link>
            <a href={`tel:${site.phoneTel}`} className="btn btn-ghost">
              Call {site.phoneDisplay}
            </a>
          </div>

          <ul
            data-hero-line
            className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-[0.78rem] font-medium uppercase tracking-[0.12em] text-white/55"
          >
            {trustPoints.slice(0, 3).map((point) => (
              <li key={point} className="inline-flex items-center gap-2">
                <span className="h-1 w-1 bg-signal" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { Motif } from "@/components/Motif";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  lead: string;
};

export function PageHero({ eyebrow, title, lead }: PageHeroProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerGsap();
      if (!root.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(root.current.querySelectorAll("[data-page-hero]"), {
        y: 40,
        opacity: 0,
        filter: "blur(8px)",
        duration: 0.95,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-black text-white"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 55% at 90% 10%, color-mix(in srgb, var(--signal) 30%, transparent), transparent 55%), linear-gradient(165deg, #000 0%, #0a0a0a 55%, #000 100%)",
        }}
        aria-hidden
      />
      <div className="grain relative mx-auto max-w-6xl px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-36">
        {eyebrow ? (
          <p
            data-page-hero
            className="condensed flex items-center gap-2 text-[0.72rem] text-signal"
          >
            <Motif tone="chalk" size={14} />
            {eyebrow}
          </p>
        ) : null}
        <h1
          data-page-hero
          className="display mt-4 max-w-3xl text-4xl leading-[1.02] sm:text-5xl md:text-6xl"
        >
          {title}
        </h1>
        <p
          data-page-hero
          className="mt-5 max-w-2xl text-base leading-relaxed text-white/68 sm:text-lg"
        >
          {lead}
        </p>
      </div>
    </section>
  );
}

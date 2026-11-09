"use client";

import { useRef, type ReactNode } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "blockquote";
  delay?: number;
  y?: number;
};

/**
 * Scroll reveal via GSAP ScrollTrigger.
 * Uses autoAlpha + clearProps so elements never stick at opacity:0
 * when Lenis/ScrollTrigger timing races on mount.
 */
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  y = 36,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      registerGsap();
      const node = ref.current;
      if (!node) return;

      gsap.set(node, { clearProps: "opacity,visibility,transform,filter" });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(node, { autoAlpha: 1, y: 0 });
        return;
      }

      const tween = gsap.fromTo(
        node,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          delay,
          ease: "power3.out",
          immediateRender: false,
          clearProps: "transform",
          scrollTrigger: {
            trigger: node,
            start: "top 90%",
            once: true,
            // If already past the start line on mount, play immediately
            // instead of leaving autoAlpha stuck at 0.
            toggleActions: "play none none none",
          },
          onComplete: () => {
            gsap.set(node, { clearProps: "opacity,visibility,transform" });
          },
        },
      );

      // Safety net: if ScrollTrigger never fires (edge timing), force visible.
      const safety = window.setTimeout(() => {
        const opacity = Number(gsap.getProperty(node, "opacity"));
        if (opacity < 0.05) {
          gsap.set(node, { autoAlpha: 1, y: 0, clearProps: "transform" });
        }
      }, 2800);

      return () => {
        window.clearTimeout(safety);
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(node, { clearProps: "opacity,visibility,transform,filter" });
      };
    },
    { dependencies: [delay, y] },
  );

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}

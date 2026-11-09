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

export function Reveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  y = 42,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      registerGsap();
      const node = ref.current;
      if (!node) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(node, { clearProps: "all", opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        node,
        { opacity: 0, y, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.05,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: node,
            start: "top 88%",
            once: true,
          },
        },
      );
    },
    { dependencies: [delay, y] },
  );

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}

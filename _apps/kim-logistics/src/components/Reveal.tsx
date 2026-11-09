"use client";

import { useEffect, useRef } from "react";
import { cx } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "blockquote";
};

export function Reveal({ children, className, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = as;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = () => node.classList.add("is-visible");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      show();
      return;
    }

    const rect = node.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    if (alreadyInView) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref as never} className={cx("reveal", className)}>
      {children}
    </Tag>
  );
}

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Magnetic button — element gently follows the cursor
export const Magnetic = ({ children, strength = 0.35, className = "", as: Tag = "div", ...rest }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - (rect.left + rect.width / 2);
    const my = e.clientY - (rect.top + rect.height / 2);
    x.set(mx * strength);
    y.set(my * strength);
  };
  const reset = () => { x.set(0); y.set(0); };

  const MotionTag = motion[Tag] || motion.div;
  return (
    <MotionTag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

// Tilt card — perspective tilt + spotlight follows cursor
export const Tilt = ({ children, className = "", max = 6 }) => {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  const tRx = useTransform(srx, (v) => `${v}deg`);
  const tRy = useTransform(sry, (v) => `${v}deg`);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rx.set((0.5 - py) * max);
    ry.set((px - 0.5) * max);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const reset = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX: tRx, rotateY: tRy, transformPerspective: 1200, transformStyle: "preserve-3d" }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Reveal text by words/letters
export const FadeIn = ({ children, delay = 0, y = 24, className = "", duration = 0.9, once = true }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, margin: "0px 0px -10% 0px" }}
    transition={{ duration, delay, ease: [0.22, 0.61, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// Stagger container
export const Stagger = ({ children, className = "", delay = 0, gap = 0.08 }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "0px 0px -8% 0px" }}
    variants={{ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } }}
    className={className}
  >
    {children}
  </motion.div>
);

export const StaggerItem = ({ children, className = "", y = 24, duration = 0.8 }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y },
      show: { opacity: 1, y: 0, transition: { duration, ease: [0.22, 0.61, 0.36, 1] } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

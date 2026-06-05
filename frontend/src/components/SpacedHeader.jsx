import React from "react";
import { motion } from "framer-motion";

// Animated headline: letters start with wide letter-spacing then close to normal.
// Each letter also fades + scales in with stagger.
export const SpacedHeader = ({
  text,
  className = "",
  delay = 0,
  startSpacing = "0.45em",
  endSpacing = "-0.02em",
  duration = 1.4,
}) => {
  const letters = Array.from(text);
  return (
    <motion.h1
      initial={{ letterSpacing: startSpacing }}
      animate={{ letterSpacing: endSpacing }}
      transition={{ delay, duration, ease: [0.22, 0.61, 0.36, 1] }}
      className={className}
      style={{ display: "inline-block" }}
    >
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            delay: delay + i * 0.02,
            duration: 0.7,
            ease: [0.22, 0.61, 0.36, 1],
          }}
          style={{ display: "inline-block", whiteSpace: ch === " " ? "pre" : "normal" }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.h1>
  );
};

// Same effect but for multi-word reveals (used on "Why Us" word-by-word reveal)
export const WordByWord = ({ text, className = "", once = true }) => {
  const words = text.split(/\s+/);
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
      className={className}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0.15, y: 12, filter: "blur(2px)" },
            show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] } },
          }}
          className="inline-block mr-[0.25em] last:mr-0"
        >
          {w}
        </motion.span>
      ))}
    </motion.div>
  );
};

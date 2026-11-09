import React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, Stagger, StaggerItem, Magnetic, Tilt } from "./Motion";
import { useContact } from "./ContactFlow";

// Honest qualitative proof only — no invented metrics or outcomes.
const CASES = [
  {
    id: "pure-kickz",
    name: "Pure Kickz",
    path: "Brand sites → Site Care",
    summary: "Premium brand + marketing site for a DTC footwear label — the shape of work that becomes Site Care after launch.",
  },
  {
    id: "glyde",
    name: "GLYDE",
    path: "Product systems → Product Keep",
    summary: "Booking flow and owner dashboard for an operator product — the shape of work that becomes Product Keep after launch.",
  },
];

const SelectedWork = () => {
  const { open: onBook } = useContact();

  return (
    <section id="work-proof" className="relative py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <FadeIn>
            <div className="inline-flex items-center gap-1.5 glass rounded-full px-2.5 py-1 text-[11px] text-white/75 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> Selected work
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="font-semibold tracking-[-0.03em] leading-[1.05] text-[28px] xs:text-[32px] sm:text-[42px] md:text-[52px]">
              <span className="shine-text">Real builds. </span>
              <span className="serif text-white">Two paths.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 text-white/55 max-w-xl mx-auto text-[13.5px] sm:text-[14.5px] px-2">
              Case studies worth naming — without vanity metrics. Fuller write-ups coming as clients approve outcomes.
            </p>
          </FadeIn>
        </div>

        <Stagger gap={0.09} className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {CASES.map((c, i) => (
            <StaggerItem key={c.id}>
              <Tilt max={3}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="relative glass glass-hover rounded-2xl p-5 sm:p-7 overflow-hidden group h-full"
                >
                  <div className="absolute inset-0 card-inner-grid opacity-25 [mask-image:radial-gradient(ellipse_at_top_left,_black,_transparent_70%)]" />
                  <div className="relative">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-white/30 text-[11px] tabular-nums">0{i + 1}</span>
                      <span className="text-[10.5px] glass rounded-full px-2.5 py-1 text-white/65">{c.path}</span>
                    </div>
                    <h3 className="mt-5 text-[22px] sm:text-[26px] font-semibold tracking-[-0.02em]">{c.name}</h3>
                    <p className="mt-2 text-white/55 leading-relaxed text-[13px] sm:text-[14px] max-w-md">{c.summary}</p>
                  </div>
                </motion.div>
              </Tilt>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn delay={0.2}>
          <div className="mt-8 flex justify-center">
            <Magnetic strength={0.25}>
              <button
                onClick={onBook}
                className="btn-sheen group inline-flex items-center gap-2 bg-white text-black rounded-full pl-4 pr-1 py-1 text-[13px] font-medium"
              >
                Book a strategy call
                <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </Magnetic>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default SelectedWork;

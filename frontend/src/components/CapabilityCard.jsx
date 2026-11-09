import React from "react";
import { motion } from "framer-motion";
import * as Lucide from "lucide-react";
import { ArrowUpRight } from "lucide-react";

/**
 * Capability card - abstract, gradient-based visual.
 * Variants:
 *  - "default" : full card with title, blurb, icon, hover arrow
 *  - "compact" : tighter version for small bento cells
 *  - "vertical": 9:16 aspect for marquee columns
 */
const CapabilityCard = ({ cap, variant = "default", onClick }) => {
  const Icon = Lucide[cap.icon] || Lucide.Sparkles;

  if (variant === "compact") {
    return (
      <div className="relative w-full h-full glass glass-hover rounded-2xl overflow-hidden group">
        {/* Gradient bg */}
        <div className={`absolute inset-0 bg-gradient-to-br ${cap.gradient}`} />
        <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full blur-3xl opacity-60 glow-pulse" style={{ background: gradientColor(cap.accent, 0.35) }} />
        <div className="absolute inset-0 card-inner-grid opacity-25 pointer-events-none" />

        <div className="relative h-full p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <motion.div
              whileHover={{ rotate: 8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="w-9 h-9 rounded-xl glass-strong grid place-items-center"
            >
              <Icon className="w-4 h-4 text-white" strokeWidth={1.6} />
            </motion.div>
            <span className="glass-strong rounded-full px-2 py-0.5 text-[9.5px] text-white/65 tracking-tight">{cap.category}</span>
          </div>
          <div>
            <div className="text-[14.5px] font-semibold tracking-[-0.015em]">{cap.title}</div>
            <div className="text-[11.5px] text-white/55 mt-0.5 line-clamp-2">{cap.blurb}</div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className="relative w-full h-full glass rounded-xl overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-b ${cap.gradient}`} />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-3xl opacity-50" style={{ background: gradientColor(cap.accent, 0.3) }} />
        <div className="absolute inset-0 card-inner-grid opacity-20 pointer-events-none" />

        <div className="relative h-full p-3 flex flex-col justify-between">
          <div className="w-8 h-8 rounded-lg glass-strong grid place-items-center">
            <Icon className="w-3.5 h-3.5 text-white" strokeWidth={1.6} />
          </div>
          <div>
            <div className="text-[11.5px] font-semibold leading-tight">{cap.title}</div>
            <div className="text-[9.5px] text-white/55 tracking-tight mt-0.5">{cap.category}</div>
          </div>
        </div>
      </div>
    );
  }

  // default
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
      className="relative w-full text-left glass glass-hover rounded-2xl overflow-hidden aspect-[4/3] group block"
    >
      {/* Gradient bg */}
      <div className={`absolute inset-0 bg-gradient-to-br ${cap.gradient}`} />
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-60" style={{ background: gradientColor(cap.accent, 0.4) }} />
      <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full blur-3xl opacity-30" style={{ background: gradientColor(cap.accent, 0.25) }} />
      <div className="absolute inset-0 card-inner-grid opacity-25 pointer-events-none" />

      <div className="relative h-full p-5 sm:p-6 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <motion.div
            whileHover={{ rotate: 8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="w-11 h-11 rounded-2xl glass-strong grid place-items-center"
          >
            <Icon className="w-4.5 h-4.5 text-white" strokeWidth={1.6} />
          </motion.div>
          <span className="glass-strong rounded-full px-2.5 py-1 text-[10.5px] text-white/70">{cap.category}</span>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="text-[18px] sm:text-[20px] font-semibold tracking-[-0.015em]">{cap.title}</div>
            <div className="text-[12.5px] sm:text-[13px] text-white/55 mt-1 leading-relaxed">{cap.blurb}</div>
          </div>
          <span className="shrink-0 w-9 h-9 rounded-full bg-white text-black grid place-items-center group-hover:rotate-45 transition-transform duration-300">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </motion.button>
  );
};

// quick helper to map accent name -> rgba for the gradient orb
function gradientColor(accent, alpha = 0.3) {
  const map = {
    sky: `rgba(56,189,248,${alpha})`,
    cyan: `rgba(34,211,238,${alpha})`,
    blue: `rgba(59,130,246,${alpha})`,
    indigo: `rgba(99,102,241,${alpha})`,
    violet: `rgba(139,92,246,${alpha})`,
    purple: `rgba(168,85,247,${alpha})`,
    fuchsia: `rgba(217,70,239,${alpha})`,
    pink: `rgba(236,72,153,${alpha})`,
    emerald: `rgba(16,185,129,${alpha})`,
    teal: `rgba(20,184,166,${alpha})`,
    lime: `rgba(132,204,22,${alpha})`,
    amber: `rgba(245,158,11,${alpha})`,
    orange: `rgba(249,115,22,${alpha})`,
    rose: `rgba(244,63,94,${alpha})`,
  };
  return map[accent] || `rgba(255,255,255,${alpha})`;
}

export default CapabilityCard;

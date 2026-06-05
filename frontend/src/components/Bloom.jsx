import React from "react";
import useReveal from "../hooks/useReveal";
import { MonitorSmartphone, Flower2, Sparkles } from "lucide-react";
import { ASSETS } from "../mock";

const Bloom = () => {
  const [ref, inView] = useReveal();
  return (
    <section ref={ref} className={`reveal-slow reveal ${inView ? "is-in" : ""} relative py-24 sm:py-32 overflow-hidden`}>
      {/* fades */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent z-10" />

      {/* flower visual: CENTERED behind text */}
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="relative w-[700px] h-[700px] sm:w-[900px] sm:h-[900px] lg:w-[1100px] lg:h-[1100px]">
          <div className="absolute inset-[20%] rounded-full bg-fuchsia-600/30 blur-[110px] glow-pulse" />
          <div className="absolute inset-[30%] rounded-full bg-violet-500/25 blur-[90px] glow-pulse" style={{ animationDelay: "1.5s" }} />
          <img
            src={ASSETS.bloom}
            alt=""
            className="relative w-full h-full object-contain drift-rotate"
            style={{ filter: "saturate(1.2) contrast(1.05) brightness(1.08) drop-shadow(0 40px 80px rgba(180,80,255,0.45))" }}
          />
        </div>
      </div>

      {/* text rows on top */}
      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-6">
        <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-[12px] text-white/75 mb-8">
          <Sparkles className="w-3.5 h-3.5" /> Manifesto
        </div>

        <div className="flex flex-col gap-2 sm:gap-3 font-semibold tracking-[-0.04em] leading-[0.95] text-[48px] sm:text-[80px] md:text-[100px] lg:text-[124px]">
          {/* Row 1: Grow Your Digital [icon] */}
          <div className="flex items-center flex-wrap gap-x-4 sm:gap-x-6">
            <span className="shine-text">Grow</span>
            <span className="shine-text">Your</span>
            <span className="shine-text">Digital</span>
            <InlineChip icon={MonitorSmartphone} />
          </div>
          {/* Row 2: Presence, Let Your */}
          <div className="flex items-center flex-wrap gap-x-4 sm:gap-x-6">
            <span className="shine-text">Presence,</span>
            <span className="shine-text">Let</span>
            <span className="shine-text">Your</span>
          </div>
          {/* Row 3: Vision [flower] Bloom */}
          <div className="flex items-center flex-wrap gap-x-4 sm:gap-x-6">
            <span className="shine-text">Vision</span>
            <InlineChip icon={Flower2} />
            <span className="serif text-white">Bloom.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const InlineChip = ({ icon: Icon }) => (
  <span className="inline-flex items-center justify-center w-[0.85em] h-[0.85em] rounded-2xl glass-strong" style={{ backdropFilter: "blur(28px) saturate(1.3)" }}>
    <Icon className="w-[42%] h-[42%] text-white" strokeWidth={1.5} />
  </span>
);

export default Bloom;

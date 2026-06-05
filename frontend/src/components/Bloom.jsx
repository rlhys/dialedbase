import React from "react";
import useReveal from "../hooks/useReveal";
import { Flower2, Sparkles } from "lucide-react";
import { ASSETS } from "../mock";

const Bloom = () => {
  const [ref, inView] = useReveal();
  return (
    <section ref={ref} className={`reveal-slow reveal ${inView ? "is-in" : ""} relative py-32 sm:py-40 overflow-hidden`}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[400px] grid-bg opacity-25 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>

      {/* HUGE 3D flower visual */}
      <div className="absolute right-[-120px] sm:right-[-100px] lg:right-[-60px] top-1/2 -translate-y-1/2 w-[560px] h-[560px] sm:w-[760px] sm:h-[760px] lg:w-[920px] lg:h-[920px] pointer-events-none">
        <div className="absolute inset-[18%] rounded-full bg-fuchsia-600/30 blur-[100px] glow-pulse" />
        <div className="absolute inset-[28%] rounded-full bg-violet-500/25 blur-[80px] glow-pulse" style={{ animationDelay: "1.5s" }} />
        <img
          src={ASSETS.bloom}
          alt=""
          className="relative w-full h-full object-contain drift-rotate"
          style={{
            filter: "saturate(1.2) contrast(1.05) brightness(1.05) drop-shadow(0 40px 80px rgba(180,80,255,0.45))",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-[12px] text-white/75 mb-7">
          <Sparkles className="w-3.5 h-3.5" /> Manifesto
        </div>
        <h2 className="font-semibold tracking-[-0.04em] leading-[0.95] text-[56px] sm:text-[88px] md:text-[104px] max-w-[14ch]">
          <span className="shine-text">Grow Your</span>
          <br />
          <span className="shine-text">Digital Presence,</span>
          <br />
          <span className="shine-text">Let Your </span>
          <InlineFlowerChip />
          <br />
          <span className="shine-text">Vision </span>
          <span className="serif text-white">Bloom.</span>
        </h2>
        <p className="mt-8 max-w-md text-white/55 text-[15px] sm:text-[17px] leading-relaxed">
          Beautiful, fast, AI‑native products engineered to compound your brand's growth — month after month, year after year.
        </p>
      </div>
    </section>
  );
};

const InlineFlowerChip = () => (
  <span className="inline-flex align-middle items-center justify-center w-[0.7em] h-[0.7em] rounded-2xl glass-strong mx-1 sm:mx-2 -translate-y-1">
    <Flower2 className="w-[44%] h-[44%] text-white" strokeWidth={1.6} />
  </span>
);

export default Bloom;

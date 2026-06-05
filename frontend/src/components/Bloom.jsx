import React from "react";
import { ASSETS } from "../mock";

const Bloom = () => {
  const words = ["Grow", "Your", "Digital", "Presence,", "Let", "Your", "Vision", "Bloom"];
  return (
    <section className="relative py-32 sm:py-40 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-[400px] grid-bg opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>

      {/* Floating bloom visual */}
      <div className="absolute right-[-120px] sm:right-[-60px] top-1/2 -translate-y-1/2 w-[460px] h-[460px] sm:w-[680px] sm:h-[680px] pointer-events-none">
        <div className="absolute inset-10 rounded-full bg-fuchsia-500/25 blur-3xl" />
        <div className="absolute inset-20 rounded-full bg-sky-400/15 blur-3xl" />
        <img
          src={ASSETS.bloomAlt}
          alt=""
          className="relative w-full h-full object-cover float-y rounded-full"
          style={{
            filter: "saturate(1.2) brightness(0.95) drop-shadow(0 30px 60px rgba(180,80,255,0.4))",
            WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 45%, transparent 75%)",
            maskImage: "radial-gradient(circle at 50% 50%, black 45%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <h2 className="text-5xl sm:text-7xl md:text-[112px] font-semibold tracking-[-0.04em] leading-[0.95]">
          {words.map((w, i) => (
            <span
              key={i}
              className="inline-block mr-3 sm:mr-5 align-middle"
            >
              <span className="shine-text">{w}</span>
              {i === 6 && (
                <span className="inline-flex w-[0.9em] h-[0.9em] rounded-2xl items-center justify-center align-middle ml-2 sm:ml-4 glass-strong">
                  <img src={ASSETS.logoBlack} className="w-[78%] h-[78%] rounded-lg" alt="" />
                </span>
              )}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
};

export default Bloom;

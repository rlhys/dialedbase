import React from "react";

const SideRail = () => {
  return (
    <>
      {/* Right rail: w. logotype + Honors vertical */}
      <div className="hidden lg:flex flex-col items-center gap-4 pointer-events-none fixed right-3 top-1/2 -translate-y-1/2 z-40">
        <div className="text-white/70 text-[28px] leading-none font-semibold tracking-tight serif">d.</div>
        <div className="h-16 w-px bg-white/15" />
        <div className="[writing-mode:vertical-rl] rotate-180 text-[10.5px] tracking-[0.45em] uppercase text-white/45">
          Honors
        </div>
      </div>

      {/* Left rail */}
      <div className="hidden lg:flex flex-col items-center gap-4 pointer-events-none fixed left-3 top-1/2 -translate-y-1/2 z-40">
        <div className="text-white/70 text-[28px] leading-none font-semibold tracking-tight serif">b.</div>
        <div className="h-16 w-px bg-white/15" />
        <div className="[writing-mode:vertical-rl] rotate-180 text-[10.5px] tracking-[0.45em] uppercase text-white/45">
          Crafted · 2025
        </div>
      </div>
    </>
  );
};

export default SideRail;

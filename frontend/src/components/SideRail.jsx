import React from "react";

const SideRail = () => {
  return (
    <div className="hidden lg:block pointer-events-none fixed right-3 top-0 bottom-0 z-40">
      <div className="h-full flex items-center">
        <div className="glass rounded-full px-2 py-3">
          <div className="[writing-mode:vertical-rl] rotate-180 text-[11px] tracking-[0.4em] uppercase text-white/55">
            Honors · 2025 · Dialedbase
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideRail;

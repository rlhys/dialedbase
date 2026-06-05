import React from "react";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../mock";
import useReveal from "../hooks/useReveal";
import { toast } from "sonner";

// Vertical phone-mockup column that scrolls
const VerticalColumn = ({ reverse = false, offsetIndex = 0 }) => {
  const items = [...PROJECTS, ...PROJECTS, ...PROJECTS];
  return (
    <div className="relative w-full h-full overflow-hidden rounded-3xl">
      <div
        className="flex flex-col gap-5"
        style={{
          animation: `marquee-y ${reverse ? "60s" : "55s"} linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
          animationDelay: `${-offsetIndex * 3}s`,
        }}
      >
        {items.map((p, i) => (
          <div key={`${p.id}-${i}`} className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden glass">
            <img src={p.mockup} alt={p.name} className="absolute inset-0 w-full h-full object-cover opacity-95" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-2.5 left-2.5 glass-strong rounded-full pl-2 pr-3 py-1 text-[11px] inline-flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-white/10 grid place-items-center text-[9px] font-semibold">{p.name.charAt(0)}</span>
              {p.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FinalCTA = () => {
  const [ref, inView] = useReveal();
  const onBook = () => toast("Mocked: opens Calendly in production.");

  return (
    <section id="contact" ref={ref} className={`reveal ${inView ? "is-in" : ""} relative py-20 sm:py-28 overflow-hidden`}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        <div className="relative glass rounded-[28px] sm:rounded-[36px] overflow-hidden">
          <div className="absolute inset-0 card-inner-grid opacity-30 pointer-events-none" />
          <div className="relative grid grid-cols-12 gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 min-h-[640px] sm:min-h-[720px]">
            {/* LEFT vertical column */}
            <div className="hidden md:block col-span-3 h-[640px]">
              <VerticalColumn />
            </div>

            {/* CENTER text */}
            <div className="col-span-12 md:col-span-6 flex items-center justify-center text-center px-4 py-12">
              <div className="max-w-md">
                <h2 className="font-semibold tracking-[-0.04em] leading-[0.95]">
                  <span className="shine-text block text-[28px] sm:text-[34px] md:text-[42px] font-medium tracking-tight">Lead in Your</span>
                  <span className="serif text-white block text-[64px] sm:text-[88px] md:text-[108px]">Industry.</span>
                </h2>
                <p className="mt-6 text-white/55 text-[14.5px] sm:text-[16px] leading-relaxed">
                  Ready to stand out from the competition? Let's build something extraordinary together and take your brand to the next level.
                </p>
                <button
                  onClick={onBook}
                  className="mt-8 btn-sheen group inline-flex items-center gap-2 bg-white text-black rounded-full pl-1.5 pr-5 py-1.5 text-[15px] font-medium"
                >
                  <span className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                  Book a call
                </button>
              </div>
            </div>

            {/* RIGHT vertical column */}
            <div className="hidden md:block col-span-3 h-[640px]">
              <VerticalColumn reverse offsetIndex={2} />
            </div>

            {/* mobile-only horizontal preview */}
            <div className="col-span-12 md:hidden flex gap-3 overflow-hidden no-scrollbar">
              {PROJECTS.slice(0, 3).map((p) => (
                <div key={p.id} className="shrink-0 w-[140px] aspect-[9/16] rounded-2xl overflow-hidden glass">
                  <img src={p.mockup} alt={p.name} className="w-full h-full object-cover opacity-90" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

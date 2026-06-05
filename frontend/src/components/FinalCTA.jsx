import React from "react";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../mock";
import { FadeIn, Magnetic } from "./Motion";
import { toast } from "sonner";

const VerticalColumn = ({ reverse = false, offsetIndex = 0 }) => {
  const items = [...PROJECTS, ...PROJECTS, ...PROJECTS];
  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
        maskImage: "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
      }}
    >
      <div
        className="flex flex-col gap-3"
        style={{
          animation: `marquee-y ${reverse ? "60s" : "55s"} linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
          animationDelay: `${-offsetIndex * 3}s`,
        }}
      >
        {items.map((p, i) => (
          <div key={`${p.id}-${i}`} className="relative w-full aspect-[9/16] rounded-xl overflow-hidden glass">
            <img src={p.mockup} alt={p.name} className="absolute inset-0 w-full h-full object-cover opacity-95" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 glass-strong rounded-full pl-1.5 pr-2.5 py-0.5 text-[10px] inline-flex items-center gap-1">
              <span className="w-3.5 h-3.5 rounded-full bg-white/10 grid place-items-center text-[8px] font-semibold">{p.name.charAt(0)}</span>
              {p.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// horizontal scroller for mobile
const HorizontalStrip = ({ reverse = false, offsetIndex = 0 }) => {
  const items = [...PROJECTS, ...PROJECTS, ...PROJECTS];
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div
        className="flex gap-2.5"
        style={{
          width: "max-content",
          animation: `marquee-x ${reverse ? "55s" : "50s"} linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
          animationDelay: `${-offsetIndex * 2}s`,
        }}
      >
        {items.map((p, i) => (
          <div key={`${p.id}-${i}`} className="shrink-0 w-[100px] aspect-[9/16] rounded-xl overflow-hidden glass">
            <img src={p.mockup} alt={p.name} className="absolute inset-0 w-full h-full object-cover opacity-95" />
          </div>
        ))}
      </div>
    </div>
  );
};

const FinalCTA = () => {
  const onBook = () => toast("Mocked: opens Calendly in production.");

  return (
    <section id="contact" className="relative py-14 sm:py-20 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <div className="relative glass rounded-3xl overflow-hidden">
            <div className="absolute inset-0 card-inner-grid opacity-25 pointer-events-none" />
            <div className="relative grid grid-cols-12 gap-3 sm:gap-5 p-3 sm:p-5 md:p-6 min-h-[440px] sm:min-h-[500px]">
              {/* Mobile top strip */}
              <div className="col-span-12 md:hidden">
                <HorizontalStrip />
              </div>

              {/* Left vertical column (md+) */}
              <div className="hidden md:block col-span-3 h-[460px]">
                <VerticalColumn />
              </div>

              <div className="col-span-12 md:col-span-6 flex items-center justify-center text-center px-3 py-6 md:py-0">
                <div className="max-w-md">
                  <FadeIn>
                    <h2 className="font-semibold tracking-[-0.04em] leading-[0.98]">
                      <span className="shine-text block text-[20px] xs:text-[22px] sm:text-[26px] md:text-[30px] font-medium tracking-tight">Lead in Your</span>
                      <span className="serif text-white block text-[42px] xs:text-[48px] sm:text-[60px] md:text-[72px]">Industry.</span>
                    </h2>
                  </FadeIn>
                  <FadeIn delay={0.1}>
                    <p className="mt-4 text-white/55 text-[13px] sm:text-[14px] leading-relaxed">
                      Ready to stand out from the competition? Let's build something extraordinary together and take your brand to the next level.
                    </p>
                  </FadeIn>
                  <FadeIn delay={0.18}>
                    <Magnetic strength={0.25}>
                      <button
                        onClick={onBook}
                        className="mt-6 btn-sheen group inline-flex items-center gap-2 bg-white text-black rounded-full pl-1 pr-4 py-1 text-[13px] font-medium"
                      >
                        <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                        Book a call
                      </button>
                    </Magnetic>
                  </FadeIn>
                </div>
              </div>

              {/* Right vertical column (md+) */}
              <div className="hidden md:block col-span-3 h-[460px]">
                <VerticalColumn reverse offsetIndex={2} />
              </div>

              {/* Mobile bottom strip (reverse) */}
              <div className="col-span-12 md:hidden">
                <HorizontalStrip reverse offsetIndex={2} />
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default FinalCTA;

import React, { useRef } from "react";
import { ArrowUpRight, BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { PROJECTS } from "../mock";

const Showcase = () => {
  const scrollerRef = useRef(null);

  const scrollBy = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section id="work" className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 mb-10 flex items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-[12px] text-white/75 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            Selected Work
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1]">
            <span className="shine-text">Built for brands</span>
            <br />
            <span className="shine-text">that refuse to blend in.</span>
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scrollBy(-1)}
            className="w-11 h-11 grid place-items-center rounded-full glass hover:bg-white/10 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            className="w-11 h-11 grid place-items-center rounded-full glass hover:bg-white/10 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <a
            href="#contact"
            className="ml-2 group inline-flex items-center gap-2 bg-white text-black rounded-full pl-4 pr-1 py-1 text-[14px] font-medium"
          >
            See All Work
            <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="no-scrollbar overflow-x-auto scroll-smooth pl-6 sm:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]"
      >
        <div className="flex gap-5 pr-6 pb-2">
          {PROJECTS.map((p) => (
            <article
              key={p.id}
              className="shrink-0 w-[80vw] sm:w-[520px] md:w-[600px] lg:w-[640px] aspect-[4/3] rounded-3xl glass relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 card-inner-grid opacity-50" />
              <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,_black_60%,_transparent_100%)]">
                <img
                  src={p.mockup}
                  alt={p.name}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-[1.04] transition-transform duration-[1200ms] ease-out"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute left-5 bottom-5 right-5 flex items-end justify-between gap-4">
                <div className="glass-strong rounded-full pl-2 pr-3 py-1.5 flex items-center gap-2 max-w-full">
                  <span className="w-7 h-7 rounded-full bg-white/10 grid place-items-center text-[12px] font-semibold">
                    {p.name.charAt(0)}
                  </span>
                  <span className="text-[13px] font-medium">{p.name}</span>
                  {p.verified && (
                    <BadgeCheck className="w-4 h-4 text-sky-400" />
                  )}
                  <span className="hidden sm:inline text-white/40 text-[12px]">• {p.tag}</span>
                </div>
                <a
                  href="#contact"
                  className="shrink-0 w-10 h-10 rounded-full bg-white text-black grid place-items-center hover:rotate-45 transition-transform duration-300"
                  aria-label="Open project"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;

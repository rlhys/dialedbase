import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Users, BadgeCheck } from "lucide-react";
import { TESTIMONIALS } from "../mock";
import useReveal from "../hooks/useReveal";

const Testimonials = () => {
  const ref = useRef(null);
  const [headRef, headIn] = useReveal();
  const scrollBy = (dir) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.7), behavior: "smooth" });
  };

  return (
    <section className="relative py-24 sm:py-32">
      <div ref={headRef} className={`reveal ${headIn ? "is-in" : ""} max-w-7xl mx-auto px-6 mb-10`}>
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-[12px] text-white/75 mb-5">
            <Users className="w-3.5 h-3.5" /> Testimonials
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.05]">
            <span className="shine-text">What Our Partners Say</span>
            <br />
            <span className="shine-text">Real Stories. Real Results.</span>
          </h2>
          <p className="mt-6 text-white/55 max-w-xl mx-auto">Straight from those who know us best.</p>
        </div>

        <div className="flex items-center justify-end gap-2">
          <button onClick={() => scrollBy(-1)} className="w-10 h-10 grid place-items-center rounded-full glass hover:bg-white/10"><ChevronLeft className="w-4 h-4"/></button>
          <button onClick={() => scrollBy(1)} className="w-10 h-10 grid place-items-center rounded-full glass hover:bg-white/10"><ChevronRight className="w-4 h-4"/></button>
        </div>
      </div>

      <div ref={ref} className="no-scrollbar overflow-x-auto scroll-smooth pl-6 sm:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
        <div className="flex gap-5 pr-6 pb-2">
          {TESTIMONIALS.map((t) => (
            <article key={t.id} className="shrink-0 w-[88vw] sm:w-[440px] md:w-[460px] rounded-3xl glass p-7 relative overflow-hidden">
              <div className="absolute inset-0 card-inner-grid opacity-30" />
              <div className="relative">
                <div className="w-14 h-14 rounded-full glass-strong grid place-items-center text-white/85 font-semibold mb-5">
                  {t.name.split(" ").map(n=>n[0]).slice(0,2).join("")}
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-[15px] font-medium">{t.name}</div>
                  <BadgeCheck className="w-4 h-4 text-sky-400" />
                </div>
                <div className="text-[13px] text-white/45">{t.role}</div>
                <p className="mt-6 text-white/75 leading-relaxed text-[14.5px]">“{t.quote}”</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

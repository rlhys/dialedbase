import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { TESTIMONIALS } from "../mock";
import useReveal from "../hooks/useReveal";

const PALETTES = [
  "from-rose-500/30 to-red-700/50",
  "from-sky-500/30 to-blue-800/50",
  "from-indigo-500/30 to-violet-800/50",
  "from-fuchsia-500/30 to-purple-800/50",
  "from-amber-500/25 to-orange-700/45",
  "from-emerald-500/30 to-teal-800/50",
  "from-zinc-300/25 to-zinc-700/50",
];

const Testimonials = () => {
  const ref = useRef(null);
  const [headRef, headIn] = useReveal();
  const scrollBy = (dir) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.7), behavior: "smooth" });
  };

  return (
    <section className="relative py-16 sm:py-24">
      <div ref={headRef} className={`reveal ${headIn ? "is-in" : ""} max-w-6xl mx-auto px-4 sm:px-6 mb-10`}>
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 glass rounded-full px-2.5 py-1 text-[11px] text-white/75 mb-4">
            <Users className="w-3 h-3" /> Testimonials
          </div>
          <h2 className="font-semibold tracking-[-0.03em] leading-[1.05] text-[32px] sm:text-[42px] md:text-[52px]">
            <span className="shine-text">What Our Partners </span>
            <span className="serif text-white">Say.</span>
          </h2>
          <p className="mt-4 text-white/55 max-w-xl mx-auto text-[13.5px] sm:text-[14.5px]">
            Real Stories. Real Results. Straight from those who know us best.
          </p>
        </div>
      </div>

      <div ref={ref} className="no-scrollbar overflow-x-auto scroll-smooth pl-4 sm:pl-[max(1rem,calc((100vw-72rem)/2+1rem))]">
        <div className="flex gap-3.5 sm:gap-4 pr-4 pb-2">
          {TESTIMONIALS.map((t, i) => (
            <article
              key={t.id}
              className="shrink-0 w-[82vw] sm:w-[340px] md:w-[360px] min-h-[360px] rounded-2xl glass p-5 sm:p-6 relative overflow-hidden"
            >
              <div className="absolute inset-0 card-inner-grid opacity-25" />
              <div className="relative">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${PALETTES[i % PALETTES.length]} grid place-items-center mb-5 shadow-[0_8px_24px_rgba(0,0,0,0.4)]`}>
                  <span className="text-[15px] font-semibold tracking-tight text-white/95">
                    {t.company.split(" ").map(w => w[0]).slice(0,2).join("")}
                  </span>
                </div>
                <div className="text-[14.5px] font-medium tracking-tight">{t.name}</div>
                <div className="text-[12.5px] text-white/45 mt-0.5">{t.role}</div>
                <p className="mt-5 text-white/80 leading-relaxed text-[13px] sm:text-[13.5px]">{t.quote}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-6 flex items-center justify-end gap-2">
        <button onClick={() => scrollBy(-1)} className="w-9 h-9 grid place-items-center rounded-full glass hover:bg-white/10"><ChevronLeft className="w-3.5 h-3.5"/></button>
        <button onClick={() => scrollBy(1)} className="w-9 h-9 grid place-items-center rounded-full glass hover:bg-white/10"><ChevronRight className="w-3.5 h-3.5"/></button>
      </div>
    </section>
  );
};

export default Testimonials;

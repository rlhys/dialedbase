import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { TESTIMONIALS } from "../mock";
import useReveal from "../hooks/useReveal";

// Brand mark color palette — used as the avatar circle background gradient
const PALETTES = [
  "from-rose-500/40 to-red-700/60",
  "from-sky-500/40 to-blue-800/60",
  "from-indigo-500/40 to-violet-800/60",
  "from-fuchsia-500/40 to-purple-800/60",
  "from-amber-500/30 to-orange-700/50",
  "from-emerald-500/40 to-teal-800/60",
  "from-zinc-300/30 to-zinc-700/60",
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
    <section className="relative py-24 sm:py-32">
      <div ref={headRef} className={`reveal ${headIn ? "is-in" : ""} max-w-7xl mx-auto px-5 sm:px-6 mb-12`}>
        <div className="text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-[12px] text-white/75 mb-5">
            <Users className="w-3.5 h-3.5" /> Testimonials
          </div>
          <h2 className="font-semibold tracking-[-0.03em] leading-[1.02] text-4xl sm:text-5xl md:text-6xl">
            <span className="shine-text">What Our Partners </span>
            <span className="serif text-white">Say.</span>
          </h2>
          <p className="mt-5 text-white/55 max-w-xl mx-auto text-[14.5px] sm:text-[16px]">
            Real Stories. Real Results. Straight From Those Who Know Us Best.
          </p>
        </div>
      </div>

      <div ref={ref} className="no-scrollbar overflow-x-auto scroll-smooth pl-5 sm:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))]">
        <div className="flex gap-5 pr-6 pb-2">
          {TESTIMONIALS.map((t, i) => (
            <article
              key={t.id}
              className="shrink-0 w-[88vw] sm:w-[400px] md:w-[440px] min-h-[460px] rounded-3xl glass p-7 sm:p-8 relative overflow-hidden flex flex-col"
            >
              <div className="absolute inset-0 card-inner-grid opacity-30" />
              <div className="relative flex flex-col h-full">
                {/* big company avatar */}
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${PALETTES[i % PALETTES.length]} grid place-items-center mb-7 shadow-[0_8px_30px_rgba(0,0,0,0.4)]`}>
                  <span className="text-[22px] font-semibold tracking-tight text-white/95">
                    {t.company.split(" ").map(w => w[0]).slice(0,2).join("")}
                  </span>
                </div>
                <div>
                  <div className="text-[18px] font-medium tracking-tight">{t.name}</div>
                  <div className="text-[13.5px] text-white/45 mt-0.5">{t.role}</div>
                </div>
                <p className="mt-6 text-white/85 leading-relaxed text-[14.5px]">{t.quote}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 mt-8 flex items-center justify-end gap-2">
        <button onClick={() => scrollBy(-1)} className="w-11 h-11 grid place-items-center rounded-full glass hover:bg-white/10"><ChevronLeft className="w-4 h-4"/></button>
        <button onClick={() => scrollBy(1)} className="w-11 h-11 grid place-items-center rounded-full glass hover:bg-white/10"><ChevronRight className="w-4 h-4"/></button>
      </div>
    </section>
  );
};

export default Testimonials;

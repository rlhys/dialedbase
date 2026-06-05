import React from "react";
import { ArrowUpRight, Globe, Smartphone, Sparkles, Wand2, Check } from "lucide-react";
import { SERVICES } from "../mock";
import { toast } from "sonner";
import useReveal from "../hooks/useReveal";

const ICONS = { Globe, Smartphone, Sparkles, Wand2 };

const Services = () => {
  const onBook = () => toast("We'll be in touch shortly — mocked for now.");
  const [headRef, headIn] = useReveal();
  const [gridRef, gridIn] = useReveal();
  return (
    <section id="services" className="relative py-16 sm:py-24">
      <div ref={headRef} className={`reveal ${headIn ? "is-in" : ""} max-w-6xl mx-auto px-4 sm:px-6`}>
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 glass rounded-full px-2.5 py-1 text-[11px] text-white/75 mb-4">
            <Sparkles className="w-3 h-3" /> Our Services
          </div>
          <h2 className="font-semibold tracking-[-0.03em] leading-[1.05] text-[32px] sm:text-[42px] md:text-[52px]">
            <span className="shine-text">Your Digital </span>
            <span className="serif text-white">Powerhouse.</span>
          </h2>
          <p className="mt-4 text-white/55 max-w-xl mx-auto text-[13.5px] sm:text-[14.5px]">
            End‑to‑end design, engineering and AI — one accountable team, no agency hand‑offs, ship‑fast cadence.
          </p>
          <button onClick={onBook} className="mt-6 btn-sheen group inline-flex items-center gap-2 bg-white text-black rounded-full pl-4 pr-1 py-1 text-[13px] font-medium">
            Book a call
            <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>

      <div ref={gridRef} className={`reveal-stagger ${gridIn ? "is-in" : ""} max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4`}>
        {SERVICES.map((s, i) => {
          const Icon = ICONS[s.icon] || Sparkles;
          return (
            <div key={s.id} className="relative glass rounded-2xl p-5 sm:p-6 overflow-hidden group hover:bg-white/[0.05] transition-colors duration-500">
              <div className="absolute inset-0 card-inner-grid opacity-30 [mask-image:radial-gradient(ellipse_at_top_right,_black,_transparent_70%)]" />
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-sky-400/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl glass-strong grid place-items-center">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[19px] sm:text-[22px] font-semibold tracking-[-0.015em]">{s.title}</h3>
                    <span className="text-white/30 text-[11px] tabular-nums">0{i + 1}</span>
                  </div>
                  <p className="mt-2 text-white/55 leading-relaxed text-[13px] sm:text-[13.5px] max-w-md">{s.desc}</p>
                  <ul className="mt-4 space-y-1.5">
                    {s.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-1.5 text-[12.5px] text-white/65">
                        <Check className="w-3 h-3 text-emerald-400" /> {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;

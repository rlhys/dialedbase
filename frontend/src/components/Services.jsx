import React from "react";
import { ArrowUpRight, Globe, Smartphone, Sparkles, Wand2, Check } from "lucide-react";
import { SERVICES } from "../mock";
import { toast } from "sonner";

const ICONS = { Globe, Smartphone, Sparkles, Wand2 };

const Services = () => {
  const onBook = () => toast("We'll be in touch shortly — mocked for now.");
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-[12px] text-white/75 mb-5">
            <Sparkles className="w-3.5 h-3.5" /> Our Services
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-[-0.03em] leading-[0.95]">
            <span className="shine-text">Your Digital</span>
            <br />
            <span className="shine-text">Powerhouse.</span>
          </h2>
          <p className="mt-6 text-white/55 max-w-2xl mx-auto">
            End‑to‑end design, engineering and AI — one accountable team, no agency hand‑offs, ship‑fast cadence.
          </p>
          <button
            onClick={onBook}
            className="mt-7 btn-sheen group inline-flex items-center gap-2 bg-white text-black rounded-full pl-5 pr-1.5 py-1.5 text-[14.5px] font-medium"
          >
            Book a call
            <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] || Sparkles;
            return (
              <div
                key={s.id}
                className="relative glass rounded-3xl p-7 sm:p-9 overflow-hidden group hover:bg-white/[0.06] transition-colors duration-500"
              >
                <div className="absolute inset-0 card-inner-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top_right,_black,_transparent_70%)]" />
                <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-sky-400/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative flex items-start gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-2xl glass-strong grid place-items-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[26px] sm:text-[30px] font-semibold tracking-[-0.02em]">{s.title}</h3>
                      <span className="text-white/30 text-[12px] tabular-nums">0{i + 1}</span>
                    </div>
                    <p className="mt-3 text-white/60 leading-relaxed text-[14.5px] max-w-md">{s.desc}</p>
                    <ul className="mt-5 space-y-2">
                      {s.points.map((pt) => (
                        <li key={pt} className="flex items-center gap-2 text-[13.5px] text-white/70">
                          <Check className="w-3.5 h-3.5 text-emerald-400" /> {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;

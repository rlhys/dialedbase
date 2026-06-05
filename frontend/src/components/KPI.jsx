import React from "react";
import { BarChart3, Globe, Briefcase } from "lucide-react";
import { KPIS } from "../mock";
import useReveal from "../hooks/useReveal";

const ICONS = { BarChart3, Globe, Briefcase };

const KPI = () => {
  const [ref, visible] = useReveal();
  return (
    <section ref={ref} className={`reveal ${visible ? "is-in" : ""} relative py-24 sm:py-32`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-[12px] text-white/75 mb-5">
            <BarChart3 className="w-3.5 h-3.5" /> Key Performance Indicators
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-[-0.03em] leading-[0.95]">
            <span className="shine-text">Numbers That</span>
            <br />
            <span className="shine-text">Just Make Sense.</span>
          </h2>
          <p className="mt-6 text-white/55 max-w-xl mx-auto">Relentlessly KPI‑driven. Real outcomes. Real revenue.</p>
        </div>

        <div className={`reveal-stagger ${visible ? "is-in" : ""} grid grid-cols-1 md:grid-cols-3 gap-5`}>
          {KPIS.map((k) => {
            const Icon = ICONS[k.icon] || Globe;
            return (
              <div key={k.id} className="relative glass rounded-3xl p-8 sm:p-10 min-h-[260px] sm:min-h-[300px] overflow-hidden">
                <div className="absolute inset-0 card-inner-grid opacity-40" />
                <div className="relative">
                  <div className="shine-text font-semibold text-[64px] sm:text-[88px] leading-none tracking-[-0.04em]">{k.value}</div>
                  <div className="mt-3 text-white/90 text-[18px] font-medium">{k.label}</div>
                  <p className="mt-2 text-white/50 text-[14px] max-w-[18rem]">{k.sub}</p>
                </div>
                <div className="absolute bottom-5 left-7 w-10 h-10 rounded-full glass-strong grid place-items-center">
                  <Icon className="w-4 h-4 text-white/80" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KPI;

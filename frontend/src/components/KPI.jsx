import React from "react";
import { BarChart3, Globe, Briefcase } from "lucide-react";
import { KPIS } from "../mock";
import { FadeIn, Stagger, StaggerItem } from "./Motion";
import useCountUp from "../hooks/useCountUp";

const ICONS = { BarChart3, Globe, Briefcase };

// Parses "5B+" → { num: 5, suffix: "B+" } so we can animate the number
const parseValue = (s) => {
  const match = String(s).match(/^([\d.]+)(.*)$/);
  if (!match) return { num: 0, suffix: s };
  return { num: parseFloat(match[1]), suffix: match[2] };
};

const KpiCard = ({ k }) => {
  const Icon = ICONS[k.icon] || Globe;
  const { num, suffix } = parseValue(k.value);
  const decimals = num % 1 !== 0 ? 1 : 0;
  const [ref, display] = useCountUp(num, { duration: 1500, decimals });

  return (
    <StaggerItem>
      <div ref={ref} className="relative glass glass-hover rounded-2xl p-6 sm:p-7 min-h-[200px] sm:min-h-[230px] overflow-hidden">
        <div className="absolute inset-0 card-inner-grid opacity-25" />
        <div className="relative">
          <div className="shine-text font-semibold text-[44px] sm:text-[60px] md:text-[68px] leading-none tracking-[-0.04em] tabular-nums">
            {display}{suffix}
          </div>
          <div className="mt-2 text-white/90 text-[15px] sm:text-[16px] font-medium">{k.label}</div>
          <p className="mt-1.5 text-white/45 text-[12.5px] sm:text-[13px] max-w-[17rem] leading-relaxed">{k.sub}</p>
        </div>
        <div className="absolute bottom-4 left-6 w-8 h-8 rounded-full glass-strong grid place-items-center">
          <Icon className="w-3.5 h-3.5 text-white/80" />
        </div>
      </div>
    </StaggerItem>
  );
};

const KPI = () => (
  <section className="relative py-16 sm:py-24">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10 sm:mb-12">
        <FadeIn>
          <div className="inline-flex items-center gap-1.5 glass rounded-full px-2.5 py-1 text-[11px] text-white/75 mb-4">
            <BarChart3 className="w-3 h-3" /> KPIs
          </div>
        </FadeIn>
        <FadeIn delay={0.05}>
          <h2 className="font-semibold tracking-[-0.03em] leading-[1.05] text-[28px] xs:text-[32px] sm:text-[42px] md:text-[52px]">
            <span className="shine-text">Numbers That </span>
            <span className="serif text-white">Just Make Sense.</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-4 text-white/55 max-w-xl mx-auto text-[13.5px] sm:text-[14.5px] px-2">Relentlessly KPI‑driven. Real outcomes. Real revenue.</p>
        </FadeIn>
      </div>

      <Stagger gap={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {KPIS.map((k) => <KpiCard key={k.id} k={k} />)}
      </Stagger>
    </div>
  </section>
);

export default KPI;

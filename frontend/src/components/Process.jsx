import React from "react";
import { motion } from "framer-motion";
import { Compass, Pencil, Code2, Rocket, ArrowRight } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "./Motion";

const STEPS = [
  {
    id: "discover",
    num: "01",
    title: "Discover",
    desc: "30‑minute strategy call. We map your goals, audience and constraints — then scope a tight plan with clear outcomes.",
    icon: Compass,
    tags: ["Strategy", "Scope", "Roadmap"],
  },
  {
    id: "design",
    num: "02",
    title: "Design",
    desc: "Brand direction, UX flows, motion language. We design in high fidelity from day one — no static mood boards, no guesswork.",
    icon: Pencil,
    tags: ["Brand", "UX/UI", "Motion"],
  },
  {
    id: "build",
    num: "03",
    title: "Build",
    desc: "Production engineering. React, Next, Stripe, OpenAI, realtime infra — wired in cleanly and ready to scale on launch day.",
    icon: Code2,
    tags: ["Web & App", "AI", "Infra"],
  },
  {
    id: "ship",
    num: "04",
    title: "Ship",
    desc: "Launch with confidence. We measure what matters, iterate fast, and stay on the ground post‑launch to compound your growth.",
    icon: Rocket,
    tags: ["Launch", "Analytics", "Iterate"],
  },
];

const Process = () => {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <FadeIn>
            <div className="inline-flex items-center gap-1.5 glass rounded-full px-2.5 py-1 text-[11px] text-white/75 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> How We Work
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="font-semibold tracking-[-0.03em] leading-[1.05] text-[28px] xs:text-[32px] sm:text-[42px] md:text-[52px]">
              <span className="shine-text">A tight process </span>
              <span className="serif text-white">that ships.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 text-white/55 max-w-xl mx-auto text-[13.5px] sm:text-[14.5px] px-2">
              Four steps, zero bloat. From first call to live launch — usually in weeks, not months.
            </p>
          </FadeIn>
        </div>

        {/* Connector line behind cards (desktop only) */}
        <div className="relative">
          <div className="hidden lg:block absolute top-[58px] left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          <Stagger gap={0.09} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              return (
                <StaggerItem key={s.id}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className="relative glass glass-hover rounded-2xl p-5 sm:p-6 overflow-hidden h-full group"
                  >
                    <div className="absolute inset-0 card-inner-grid opacity-25 [mask-image:radial-gradient(ellipse_at_top,_black,_transparent_70%)]" />
                    <div className="absolute -top-20 -right-20 w-52 h-52 rounded-full bg-sky-400/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative">
                      {/* Step number + icon row */}
                      <div className="flex items-center justify-between mb-5">
                        <motion.div
                          whileHover={{ rotate: 8 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          className="w-11 h-11 rounded-2xl glass-strong grid place-items-center"
                        >
                          <Icon className="w-4.5 h-4.5 text-white" strokeWidth={1.6} />
                        </motion.div>
                        <span className="text-white/30 text-[12px] tabular-nums tracking-widest">({s.num})</span>
                      </div>

                      <h3 className="text-[20px] sm:text-[22px] font-semibold tracking-[-0.015em]">{s.title}</h3>
                      <p className="mt-2 text-white/55 leading-relaxed text-[13px] sm:text-[13.5px]">{s.desc}</p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {s.tags.map((t) => (
                          <span key={t} className="text-[10.5px] tracking-tight glass rounded-full px-2 py-0.5 text-white/70">
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Mobile / tablet connector arrow */}
                      {i < STEPS.length - 1 && (
                        <div className="lg:hidden absolute top-5 right-5 text-white/25">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        {/* Sub-footer copy */}
        <FadeIn delay={0.3}>
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <div className="text-white/45 text-[12.5px] tracking-[0.15em] uppercase">Typical timeline</div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Pill label="Discover" sub="Day 1" />
              <Dot />
              <Pill label="Design" sub="Week 1–2" />
              <Dot />
              <Pill label="Build" sub="Week 2–6" />
              <Dot />
              <Pill label="Ship" sub="Week 6+" />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const Pill = ({ label, sub }) => (
  <div className="glass rounded-full px-3 py-1.5 leading-tight text-center">
    <div className="text-[11.5px] font-medium text-white">{label}</div>
    <div className="text-[9.5px] text-white/45 tracking-wider uppercase">{sub}</div>
  </div>
);

const Dot = () => <span className="w-1 h-1 rounded-full bg-white/25" />;

export default Process;

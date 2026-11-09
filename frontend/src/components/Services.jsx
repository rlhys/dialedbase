import React from "react";
import { ArrowUpRight, Globe, Smartphone, Sparkles, Check } from "lucide-react";
import { motion } from "framer-motion";
import { SERVICES } from "../mock";
import { FadeIn, Stagger, StaggerItem, Magnetic, Tilt } from "./Motion";
import { useContact } from "./ContactFlow";

const ICONS = { Globe, Smartphone, Sparkles };

const Services = () => {
  const { open: onBook } = useContact();
  return (
    <section id="services" className="relative py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <FadeIn>
            <div className="inline-flex items-center gap-1.5 glass rounded-full px-2.5 py-1 text-[11px] text-white/75 mb-4">
              <Sparkles className="w-3 h-3" /> Two paths
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="font-semibold tracking-[-0.03em] leading-[1.05] text-[28px] xs:text-[32px] sm:text-[42px] md:text-[52px]">
              <span className="shine-text">Build the thing. </span>
              <span className="serif text-white">Keep it sharp.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 text-white/55 max-w-xl mx-auto text-[13.5px] sm:text-[14.5px] px-2">
              Projects seed retainers. Every build is scoped with a Keep path — Product Keep for operator apps, Site Care for brand surfaces.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <Magnetic strength={0.25}>
              <button onClick={onBook} className="mt-6 btn-sheen group inline-flex items-center gap-2 bg-white text-black rounded-full pl-4 pr-1 py-1 text-[13px] font-medium">
                Book a strategy call
                <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </Magnetic>
          </FadeIn>
        </div>

        <Stagger gap={0.09} className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] || Sparkles;
            return (
              <StaggerItem key={s.id}>
                <Tilt max={3}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className="relative glass glass-hover rounded-2xl p-5 sm:p-6 overflow-hidden group h-full flex flex-col"
                  >
                    <div className="absolute inset-0 card-inner-grid opacity-25 [mask-image:radial-gradient(ellipse_at_top_right,_black,_transparent_70%)]" />
                    <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-sky-400/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative flex items-start gap-4 flex-1">
                      <motion.div
                        whileHover={{ rotate: 8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="shrink-0 w-10 h-10 rounded-xl glass-strong grid place-items-center"
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-[19px] sm:text-[22px] font-semibold tracking-[-0.015em]">{s.title}</h3>
                          <span className="text-white/30 text-[11px] tabular-nums">0{i + 1}</span>
                        </div>
                        <p className="mt-2 text-white/55 leading-relaxed text-[13px] sm:text-[13.5px] max-w-md">{s.desc}</p>
                        <ul className="mt-4 space-y-1.5">
                          {s.points.map((pt) => (
                            <li key={pt} className="flex items-center gap-1.5 text-[12.5px] text-white/65">
                              <Check className="w-3 h-3 text-emerald-400 shrink-0" /> {pt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="relative mt-5 pl-14">
                      <a
                        href="#keep"
                        className="inline-flex items-center gap-1 text-[12.5px] text-white/70 hover:text-white transition-colors"
                      >
                        Leads to {s.keep} <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </motion.div>
                </Tilt>
              </StaggerItem>
            );
          })}
        </Stagger>

        <FadeIn delay={0.2}>
          <p className="mt-8 text-center text-white/40 text-[12.5px] max-w-lg mx-auto">
            AI agents, voice, and 3D motion are available when the build needs them — not as equal homepage pillars until there is a live case study.
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

export default Services;

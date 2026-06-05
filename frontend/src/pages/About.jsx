import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, BadgeCheck, Plus } from "lucide-react";
import { WordByWord } from "../components/SpacedHeader";
import { FadeIn, Stagger, StaggerItem } from "../components/Motion";
import { TEAM_MEMBERS, SERVICES_LONG, MANIFESTO } from "../data/extra";
import { ASSETS } from "../mock";
import { useContact } from "../components/ContactFlow";

const About = () => {
  const { open } = useContact();
  const [active, setActive] = React.useState("web");

  return (
    <div className="relative pt-24 sm:pt-28">
      {/* HERO */}
      <section className="relative pb-10 sm:pb-14">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] blue-glow" />
          <div className="absolute top-0 left-0 right-0 h-[500px] grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,_black_30%,_transparent_70%)]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="glass inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] text-white/80 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> About Us
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="font-semibold tracking-[-0.03em] leading-[1.02] text-[36px] sm:text-[54px] md:text-[72px] lg:text-[88px] max-w-[16ch]">
              <span className="shine-text">A founder‑led studio </span>
              <span className="serif text-white">built to compound.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="mt-5 text-white/55 text-[14.5px] sm:text-[16px] max-w-2xl leading-relaxed">
              Dialedbase is a small, founder‑led studio shipping beautiful, AI‑native products for ambitious brands. No middlemen, no agency hand‑offs — just a tight squad obsessed with craft, speed and outcomes.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* TEAM — Rhys feature card */}
      <section className="relative py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="mb-8">
              <div className="inline-flex items-center gap-1.5 glass rounded-full px-2.5 py-1 text-[11px] text-white/75 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Team
              </div>
              <h2 className="font-semibold tracking-[-0.03em] leading-[1.05] text-[26px] sm:text-[36px] md:text-[44px]">
                <span className="shine-text">The person </span>
                <span className="serif text-white">behind it.</span>
              </h2>
            </div>
          </FadeIn>

          {TEAM_MEMBERS.map((m) => (
            <FadeIn key={m.id} delay={0.05}>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="relative glass glass-hover rounded-3xl overflow-hidden"
              >
                <div className="absolute inset-0 card-inner-grid opacity-25 pointer-events-none" />
                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-5 relative aspect-[4/5] lg:aspect-auto lg:min-h-[460px] overflow-hidden">
                    <img src={m.img} alt={m.name} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 18%" }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 glass-strong rounded-full px-2.5 py-1 text-[11px] inline-flex items-center gap-1.5">
                      <img src={ASSETS.logoBlack} className="w-3.5 h-3.5 rounded" alt="" />
                      Dialedbase
                    </div>
                  </div>

                  <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-[24px] sm:text-[30px] lg:text-[36px] font-semibold tracking-[-0.02em]">{m.name}</h3>
                        <BadgeCheck className="w-5 h-5 text-sky-400" />
                      </div>
                      <div className="mt-1 text-white/55 text-[13px]">{m.role} · Dialedbase</div>
                      <p className="mt-4 text-white/75 leading-relaxed text-[13.5px] sm:text-[14.5px] max-w-xl">
                        {m.bio} Six years of shipping production design and code for brands across luxury hospitality, SaaS, and AI.
                      </p>

                      <div className="mt-6 grid grid-cols-3 gap-2.5 max-w-md">
                        {[
                          { k: "Years", v: "6+" },
                          { k: "Clients", v: "40+" },
                          { k: "Countries", v: "12" },
                        ].map((s) => (
                          <div key={s.k} className="glass rounded-xl p-3">
                            <div className="shine-text text-xl sm:text-2xl font-semibold tracking-tight">{s.v}</div>
                            <div className="text-[10px] text-white/50 mt-0.5 tracking-[0.18em] uppercase">{s.k}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      <button onClick={open} className="btn-sheen group inline-flex items-center gap-2 bg-white text-black rounded-full pl-4 pr-1 py-1 text-[13px] font-medium">
                        Work with {m.name.split(" ")[0]}
                        <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </button>
                      <a href={m.social} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 glass glass-hover rounded-full px-3 py-1.5 text-[12.5px] text-white/85 hover:bg-white/10 transition-colors">
                        <Instagram className="w-3.5 h-3.5" /> @rhysgbp
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* MANIFESTO — word-by-word reveal */}
      <section className="relative py-10 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="inline-flex items-center gap-1.5 glass rounded-full px-2.5 py-1 text-[11px] text-white/75 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400" /> Why Us
            </div>
          </FadeIn>
          <WordByWord
            text={MANIFESTO}
            className="font-semibold tracking-[-0.025em] leading-[1.18] text-[22px] sm:text-[30px] md:text-[38px] lg:text-[44px] text-white"
          />
        </div>
      </section>

      {/* SERVICES ACCORDION */}
      <section className="relative py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="inline-flex items-center gap-1.5 glass rounded-full px-2.5 py-1 text-[11px] text-white/75 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> Our Services
            </div>
            <h2 className="font-semibold tracking-[-0.03em] leading-[1.05] text-[26px] sm:text-[36px] md:text-[46px] max-w-[18ch]">
              <span className="shine-text">Accelerate growth with end‑to‑end </span>
              <span className="serif text-white">solutions.</span>
            </h2>
            <p className="mt-3 text-white/55 max-w-xl text-[14px]">
              Eliminate disconnected systems and scattered efforts with our unified, ship‑fast approach.
            </p>
          </FadeIn>

          <div className="mt-8 divide-y divide-white/[0.07] border-y border-white/[0.07]">
            {SERVICES_LONG.map((s) => {
              const isOpen = active === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(isOpen ? "" : s.id)}
                  className="w-full text-left py-5 sm:py-6 px-2 group block"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className="text-white/35 text-[12px] sm:text-[13px] tabular-nums tracking-widest">({s.num})</span>
                      <h3 className={`font-semibold tracking-[-0.02em] text-[22px] sm:text-[32px] md:text-[40px] transition-colors duration-300 ${isOpen ? "text-white" : "text-white/55 group-hover:text-white"}`}>
                        {s.title}
                      </h3>
                    </div>
                    <span className={`shrink-0 w-9 h-9 rounded-full glass grid place-items-center transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                      <Plus className="w-4 h-4" />
                    </span>
                  </div>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 pl-0 sm:pl-[68px] pr-2 sm:pr-20 text-white/65 text-[14px] sm:text-[15px] leading-relaxed max-w-3xl">
                      {s.desc}
                    </p>
                  </motion.div>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

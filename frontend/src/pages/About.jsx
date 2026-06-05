import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, BadgeCheck, Plus } from "lucide-react";
import { SpacedHeader, WordByWord } from "../components/SpacedHeader";
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
      <section className="relative pb-16 sm:pb-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] blue-glow" />
          <div className="absolute top-0 left-0 right-0 h-[600px] grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,_black_30%,_transparent_70%)]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="glass inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] text-white/80 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> About Us
            </div>
          </FadeIn>

          <SpacedHeader
            text="A Founder\u2011Led Studio"
            className="block font-semibold tracking-[-0.02em] text-[36px] sm:text-[58px] md:text-[80px] lg:text-[96px] leading-[1] shine-text"
            delay={0.1}
          />
          <div className="mt-3">
            <SpacedHeader
              text="Built To Compound"
              className="block font-semibold tracking-[-0.02em] text-[36px] sm:text-[58px] md:text-[80px] lg:text-[96px] leading-[1]"
              delay={0.55}
            />
          </div>

          <FadeIn delay={1.4}>
            <p className="mt-7 text-white/55 text-[14.5px] sm:text-[16px] max-w-2xl leading-relaxed">
              Dialedbase is a small, founder‑led studio shipping beautiful, AI‑native products for ambitious brands. No middlemen, no agency hand‑offs — just a tight squad obsessed with craft, speed and outcomes.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* TEAM */}
      <section className="relative py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="flex items-end justify-between gap-6 mb-10">
              <div>
                <div className="inline-flex items-center gap-1.5 glass rounded-full px-2.5 py-1 text-[11px] text-white/75 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Team
                </div>
                <h2 className="font-semibold tracking-[-0.03em] leading-[1.05] text-[28px] sm:text-[40px] md:text-[48px]">
                  <span className="shine-text">The People </span>
                  <span className="serif text-white">Behind It.</span>
                </h2>
              </div>
              <button onClick={open} className="hidden sm:inline-flex items-center gap-2 bg-white text-black rounded-full pl-4 pr-1 py-1 text-[13px] font-medium hover:bg-white/90 transition-colors">
                Join the team
                <span className="w-7 h-7 rounded-full bg-black text-white grid place-items-center"><ArrowUpRight className="w-3.5 h-3.5" /></span>
              </button>
            </div>
          </FadeIn>

          <Stagger gap={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEAM_MEMBERS.map((m) => (
              <StaggerItem key={m.id}>
                <motion.a
                  href={m.social}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="relative block glass glass-hover rounded-2xl overflow-hidden group"
                >
                  <div className="relative aspect-[4/5]">
                    <img src={m.img} alt={m.name} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 18%" }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                    <div className="absolute top-3 left-3 glass-strong rounded-full px-2.5 py-1 text-[11px] inline-flex items-center gap-1.5">
                      <img src={ASSETS.logoBlack} className="w-3.5 h-3.5 rounded" alt="" />
                      Dialedbase
                    </div>
                    <div className="absolute top-3 right-3 glass-strong rounded-full w-8 h-8 grid place-items-center text-white/90 group-hover:rotate-45 transition-transform duration-300">
                      <Instagram className="w-3.5 h-3.5" />
                    </div>
                    <div className="absolute left-4 right-4 bottom-4">
                      <div className="flex items-center gap-1.5">
                        <div className="text-[20px] sm:text-[22px] font-semibold tracking-[-0.015em]">{m.name}</div>
                        <BadgeCheck className="w-4 h-4 text-sky-400" />
                      </div>
                      <div className="text-white/65 text-[12.5px] mt-0.5">{m.role}</div>
                      <p className="mt-2 text-white/60 text-[12.5px] leading-relaxed max-w-sm">{m.bio}</p>
                    </div>
                  </div>
                </motion.a>
              </StaggerItem>
            ))}

            {/* placeholder hire card */}
            <StaggerItem>
              <button onClick={open} className="relative w-full h-full min-h-[420px] glass glass-hover rounded-2xl overflow-hidden grid place-items-center group">
                <div className="absolute inset-0 card-inner-grid opacity-25" />
                <div className="relative text-center px-6">
                  <div className="mx-auto w-14 h-14 rounded-full glass-strong grid place-items-center mb-4">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-[17px] font-semibold tracking-tight">Your name here</div>
                  <div className="text-white/55 text-[12.5px] mt-1">We're always hiring exceptional talent. Reach out.</div>
                </div>
              </button>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      {/* MANIFESTO — word-by-word reveal */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="inline-flex items-center gap-1.5 glass rounded-full px-2.5 py-1 text-[11px] text-white/75 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400" /> Why Us
            </div>
          </FadeIn>
          <WordByWord
            text={MANIFESTO}
            className="font-semibold tracking-[-0.025em] leading-[1.15] text-[24px] sm:text-[34px] md:text-[44px] lg:text-[52px] text-white"
          />
        </div>
      </section>

      {/* SERVICES ACCORDION */}
      <section className="relative py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="inline-flex items-center gap-1.5 glass rounded-full px-2.5 py-1 text-[11px] text-white/75 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> Our Services
            </div>
            <h2 className="font-semibold tracking-[-0.03em] leading-[1.05] text-[32px] sm:text-[44px] md:text-[56px] max-w-[18ch]">
              <span className="shine-text">Accelerate growth with end‑to‑end </span>
              <span className="serif text-white">solutions.</span>
            </h2>
            <p className="mt-4 text-white/55 max-w-xl text-[14.5px]">
              Eliminate disconnected systems and scattered efforts with our unified, ship‑fast approach.
            </p>
          </FadeIn>

          <div className="mt-10 divide-y divide-white/[0.07] border-y border-white/[0.07]">
            {SERVICES_LONG.map((s) => {
              const isOpen = active === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(isOpen ? "" : s.id)}
                  className="w-full text-left py-5 sm:py-7 px-2 group block"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className="text-white/35 text-[12px] sm:text-[13px] tabular-nums tracking-widest">({s.num})</span>
                      <h3 className={`font-semibold tracking-[-0.02em] text-[24px] sm:text-[36px] md:text-[44px] transition-colors duration-300 ${isOpen ? "text-white" : "text-white/55 group-hover:text-white"}`}>
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
                    <p className="pt-4 sm:pt-6 pl-0 sm:pl-[68px] pr-2 sm:pr-20 text-white/65 text-[14.5px] sm:text-[15.5px] leading-relaxed max-w-3xl">
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

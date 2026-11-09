import React from "react";
import { ArrowUpRight, Sparkles, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { ASSETS } from "../mock";
import { Tilt, Magnetic, FadeIn, Stagger, StaggerItem } from "./Motion";
import { useContact } from "./ContactFlow";
import CapabilityCard from "./CapabilityCard";
import { CAPABILITIES } from "../data/capabilities";

// Two paths + founder - demote AI/mobile as equal hero pillars
const FEATURED = {
  topLeft: CAPABILITIES.find((c) => c.id === "booking"),
  bottomLeft: CAPABILITIES.find((c) => c.id === "marketing-site"),
  center: CAPABILITIES.find((c) => c.id === "saas"),
  rhys: { id: "rhys", title: "Rhys Evans", category: "Founder" },
};

const Hero = () => {
  const { open: openContact } = useContact();

  return (
    <section id="home" className="relative pt-24 sm:pt-28 pb-12 sm:pb-16">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] blue-glow"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute top-0 left-0 right-0 h-[700px] grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,_black_30%,_transparent_70%)]" />
        <motion.div
          className="absolute top-10 left-10 w-[220px] h-[700px] light-beam rotate-12 hidden sm:block"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-10 right-10 w-[220px] h-[700px] light-beam -rotate-12 hidden sm:block"
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2, ease: "easeInOut" }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-10">
          <FadeIn>
            <div className="glass inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] text-white/80 mb-4">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              Build → Keep · Marbella · London
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="mb-3 text-[13px] sm:text-[14px] tracking-[0.22em] uppercase text-white/55">
              Dialedbase
            </div>
          </FadeIn>

          <Stagger gap={0.08} className="font-semibold tracking-[-0.03em] leading-[1.05] text-[26px] xs:text-[30px] sm:text-[38px] md:text-[46px] lg:text-[54px]">
            <StaggerItem>
              <span className="shine-text">Build once. </span>
              <span className="serif text-white">Keep shipping.</span>
            </StaggerItem>
          </Stagger>

          <FadeIn delay={0.35}>
            <p className="mt-4 text-white/55 text-[13px] sm:text-[14.5px] max-w-xl mx-auto px-2">
              Premium websites and operator products - then Dialedbase stays on as the senior builder who keeps them compounding.
            </p>
          </FadeIn>

          <FadeIn delay={0.45}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              <Magnetic strength={0.25}>
                <button
                  onClick={openContact}
                  className="btn-sheen group inline-flex items-center gap-2 bg-white text-black rounded-full pl-4 pr-1 py-1 text-[13px] font-medium"
                >
                  Book a strategy call
                  <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </Magnetic>
              <a
                href="mailto:hello@dialedbase.com"
                className="inline-flex items-center gap-1.5 glass glass-hover rounded-full px-3.5 py-2 text-[12.5px] text-white/85 hover:bg-white/10 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" /> hello@dialedbase.com
              </a>
            </div>
          </FadeIn>
        </div>

        {/* MOBILE LAYOUT */}
        <div className="md:hidden">
          <Stagger gap={0.07} className="grid grid-cols-1 gap-2.5">
            <StaggerItem>
              <div className="aspect-[16/10]">
                <CenterFeaturedCard cap={FEATURED.center} />
              </div>
            </StaggerItem>

            <div className="grid grid-cols-2 gap-2.5">
              <StaggerItem>
                <div className="aspect-square">
                  <CapabilityCard cap={FEATURED.topLeft} variant="compact" />
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="aspect-square">
                  <FounderCard />
                </div>
              </StaggerItem>
            </div>

            <StaggerItem>
              <div className="aspect-[16/8]">
                <CapabilityCard cap={FEATURED.bottomLeft} variant="compact" />
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="h-20">
                <SeeAllCard />
              </div>
            </StaggerItem>
          </Stagger>
        </div>

        {/* DESKTOP / TABLET BENTO */}
        <Stagger gap={0.06} className="hidden md:grid grid-cols-12 grid-rows-[140px_140px_140px] lg:grid-rows-[156px_156px_156px] gap-3">
          <StaggerItem className="col-span-4 row-span-3">
            <div className="h-full grid grid-rows-2 gap-3">
              <Tilt className="h-full">
                <div className="h-full">
                  <CapabilityCard cap={FEATURED.topLeft} variant="compact" />
                </div>
              </Tilt>
              <Tilt className="h-full">
                <div className="h-full">
                  <CapabilityCard cap={FEATURED.bottomLeft} variant="compact" />
                </div>
              </Tilt>
            </div>
          </StaggerItem>

          <StaggerItem className="col-span-5 row-span-3">
            <Tilt max={4} className="h-full">
              <div className="h-full">
                <CenterFeaturedCard cap={FEATURED.center} />
              </div>
            </Tilt>
          </StaggerItem>

          <StaggerItem className="col-span-3 row-span-3">
            <div className="h-full grid grid-rows-2 gap-3">
              <SeeAllCard />
              <Tilt className="h-full">
                <FounderCard fillHeight />
              </Tilt>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
};

const CenterFeaturedCard = ({ cap }) => (
  <div className="relative w-full h-full glass glass-hover rounded-2xl overflow-hidden group cursor-default">
    <div className={`absolute inset-0 bg-gradient-to-br ${cap.gradient}`} />
    <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-70 glow-pulse" style={{ background: orbColor(cap.accent, 0.4) }} />
    <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-50" style={{ background: orbColor(cap.accent, 0.28) }} />
    <div className="absolute inset-0 card-inner-grid opacity-25 pointer-events-none" />

    <div className="relative h-full p-5 sm:p-6 flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <motion.div
          whileHover={{ rotate: 8, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl glass-strong grid place-items-center"
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={1.6} />
        </motion.div>
        <span className="glass-strong rounded-full px-2.5 py-1 text-[10.5px] text-white/70">Build → Keep</span>
      </div>

      <div>
        <div className="text-[22px] sm:text-[28px] md:text-[30px] font-semibold tracking-[-0.02em] leading-[1.05]">
          <span className="shine-text">Products that keep </span>
          <span className="serif text-white">compounding.</span>
        </div>
        <div className="mt-2 text-white/55 text-[12.5px] sm:text-[13.5px] leading-relaxed max-w-md">
          Operator apps and brand sites engineered to ship - then stay sharp under a monthly Keep.
        </div>
      </div>
    </div>
  </div>
);

const FounderCard = ({ fillHeight = false }) => (
  <div className={`relative glass glass-hover rounded-2xl overflow-hidden ${fillHeight ? "h-full" : "w-full h-full"}`}>
    <img src={ASSETS.rhys} alt="Rhys Evans" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 18%" }} />
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
    <div className="absolute left-2.5 bottom-2.5 glass-strong rounded-full pl-1.5 pr-2.5 py-1 flex items-center gap-1.5 max-w-fit">
      <span className="w-5 h-5 rounded-full bg-white/10 grid place-items-center text-[9.5px] font-semibold">R</span>
      <span className="text-[11.5px] font-medium">Rhys Evans</span>
    </div>
    <div className="absolute top-2.5 right-2.5 glass-strong rounded-full px-2 py-0.5 text-[9.5px] text-white/70">Founder</div>
  </div>
);

const SeeAllCard = () => (
  <div className="relative glass glass-hover rounded-2xl overflow-hidden h-full flex items-center justify-center">
    <div className="absolute inset-0 card-inner-grid opacity-30" />
    <Magnetic strength={0.3}>
      <a href="#keep" className="relative btn-sheen group inline-flex items-center gap-1.5 bg-white text-black rounded-full pl-4 pr-1 py-1 text-[13px] font-medium">
        See Keep plans
        <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </a>
    </Magnetic>
  </div>
);

function orbColor(accent, alpha = 0.3) {
  const map = {
    sky: `rgba(56,189,248,${alpha})`,
    cyan: `rgba(34,211,238,${alpha})`,
    blue: `rgba(59,130,246,${alpha})`,
    indigo: `rgba(99,102,241,${alpha})`,
    violet: `rgba(139,92,246,${alpha})`,
    purple: `rgba(168,85,247,${alpha})`,
    fuchsia: `rgba(217,70,239,${alpha})`,
    pink: `rgba(236,72,153,${alpha})`,
    emerald: `rgba(16,185,129,${alpha})`,
    teal: `rgba(20,184,166,${alpha})`,
    amber: `rgba(245,158,11,${alpha})`,
    orange: `rgba(249,115,22,${alpha})`,
  };
  return map[accent] || `rgba(255,255,255,${alpha})`;
}

export default Hero;

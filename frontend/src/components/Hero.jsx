import React, { useEffect, useState } from "react";
import { ArrowUpRight, BadgeCheck, Play } from "lucide-react";
import { motion } from "framer-motion";
import { PROJECTS, ASSETS } from "../mock";
import { Tilt, Magnetic, FadeIn, Stagger, StaggerItem } from "./Motion";

const Hero = () => {
  const [idx, setIdx] = useState(0);
  const [bottomIdx, setBottomIdx] = useState(3);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % PROJECTS.length), 3500);
    const id2 = setInterval(() => setBottomIdx((i) => (i + 1) % PROJECTS.length), 4200);
    return () => { clearInterval(id); clearInterval(id2); };
  }, []);

  const current = PROJECTS[idx];
  const bottom = PROJECTS[bottomIdx];

  return (
    <section id="home" className="relative pt-24 sm:pt-28 pb-12 sm:pb-16">
      {/* atmospheric light */}
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
              Booking July · August projects
            </div>
          </FadeIn>

          <Stagger gap={0.08} className="font-semibold tracking-[-0.03em] leading-[1.05] text-[26px] xs:text-[30px] sm:text-[38px] md:text-[46px] lg:text-[54px]">
            <StaggerItem>
              <span className="shine-text">Premium Web, Apps & AI Systems</span>
            </StaggerItem>
            <StaggerItem>
              <span className="shine-text">That Make Customers </span>
              <span className="serif text-white">Buy.</span>
            </StaggerItem>
          </Stagger>

          <FadeIn delay={0.4}>
            <p className="mt-4 text-white/55 text-[13px] sm:text-[14.5px] max-w-xl mx-auto px-2">
              Transforming startups, SMEs, and industry giants into digital leaders.
            </p>
          </FadeIn>
        </div>

        {/* MOBILE LAYOUT — vertical stack with proper aspect ratios */}
        <div className="md:hidden">
          <Stagger gap={0.07} className="grid grid-cols-1 gap-2.5">
            {/* Big showreel first */}
            <StaggerItem>
              <BentoCard className="aspect-[16/10]">
                <CarouselImages idx={idx} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="glass-strong rounded-full w-14 h-14 grid place-items-center">
                    <Play className="w-5 h-5 text-white" fill="white" />
                  </div>
                </div>
                <div className="absolute left-3 bottom-3 right-3 flex items-end justify-between">
                  <div>
                    <div className="text-white text-[12.5px] font-medium">Dialedbase Showreel</div>
                    <div className="text-white/55 text-[10.5px]">Preview · 2025</div>
                  </div>
                  <div className="glass-strong rounded-full px-2 py-0.5 text-[10px] text-white/75">01:42</div>
                </div>
              </BentoCard>
            </StaggerItem>

            {/* 2 col row: project + founder */}
            <div className="grid grid-cols-2 gap-2.5">
              <StaggerItem>
                <BentoCard className="aspect-square">
                  <CarouselImages idx={idx} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <ClientBar name={current.name} verified={current.verified} small />
                </BentoCard>
              </StaggerItem>
              <StaggerItem>
                <BentoCard className="aspect-square">
                  <img src={ASSETS.rhys} alt="Rhys Evans" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 25%" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <ClientBar name="Rhys Evans" verified small />
                </BentoCard>
              </StaggerItem>
            </div>

            {/* See All Work full width */}
            <StaggerItem>
              <BentoCard className="h-20 flex items-center justify-center">
                <div className="absolute inset-0 card-inner-grid opacity-30" />
                <Magnetic strength={0.25}>
                  <a href="#work" className="relative btn-sheen group inline-flex items-center gap-1.5 bg-white text-black rounded-full pl-4 pr-1 py-1 text-[13px] font-medium">
                    See All Work
                    <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </a>
                </Magnetic>
              </BentoCard>
            </StaggerItem>
          </Stagger>
        </div>

        {/* DESKTOP / TABLET BENTO GRID */}
        <Stagger gap={0.06} className="hidden md:grid grid-cols-12 grid-rows-[140px_140px_140px] lg:grid-rows-[156px_156px_156px] gap-3">
          {/* Left column */}
          <StaggerItem className="col-span-4 row-span-3">
            <div className="h-full grid grid-rows-2 gap-3">
              <Tilt className="h-full">
                <BentoCard fillHeight>
                  <CarouselImages idx={idx} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <ClientBar name={current.name} verified={current.verified} />
                </BentoCard>
              </Tilt>
              <Tilt className="h-full">
                <BentoCard fillHeight>
                  <CarouselImages idx={bottomIdx} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <ClientBar name={bottom.name} verified={bottom.verified} />
                </BentoCard>
              </Tilt>
            </div>
          </StaggerItem>

          {/* Center — main showreel */}
          <StaggerItem className="col-span-5 row-span-3">
            <Tilt max={4} className="h-full">
              <BentoCard fillHeight className="cursor-pointer">
                <CarouselImages idx={idx} scaleActive />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 grid place-items-center">
                  <motion.div
                    className="glass-strong rounded-full w-16 h-16 grid place-items-center"
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    <Play className="w-6 h-6 text-white" fill="white" />
                  </motion.div>
                </div>
                <div className="absolute left-4 bottom-4 right-4 flex items-end justify-between">
                  <div>
                    <div className="text-white text-[13px] font-medium">Dialedbase Showreel</div>
                    <div className="text-white/55 text-[11px]">Preview · 2025</div>
                  </div>
                  <div className="glass-strong rounded-full px-2.5 py-0.5 text-[10.5px] text-white/75">01:42</div>
                </div>
              </BentoCard>
            </Tilt>
          </StaggerItem>

          {/* Right column */}
          <StaggerItem className="col-span-3 row-span-3">
            <div className="h-full grid grid-rows-2 gap-3">
              <BentoCard fillHeight className="flex items-center justify-center">
                <div className="absolute inset-0 card-inner-grid opacity-30" />
                <Magnetic strength={0.3}>
                  <a href="#work" className="relative btn-sheen group inline-flex items-center gap-1.5 bg-white text-black rounded-full pl-4 pr-1 py-1 text-[13px] font-medium">
                    See All Work
                    <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </a>
                </Magnetic>
              </BentoCard>
              <Tilt className="h-full">
                <BentoCard fillHeight>
                  <img src={ASSETS.rhys} alt="Rhys Evans" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 25%" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <ClientBar name="Rhys Evans" verified />
                </BentoCard>
              </Tilt>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
};

const BentoCard = ({ children, className = "", fillHeight = false }) => (
  <div className={`relative glass glass-hover rounded-2xl overflow-hidden ${fillHeight ? "h-full" : ""} ${className}`}>
    <div className="absolute inset-0 card-inner-grid opacity-25 pointer-events-none" />
    {children}
  </div>
);

const CarouselImages = ({ idx, scaleActive = false }) => (
  <>
    {PROJECTS.map((p, i) => (
      <motion.img
        key={p.id}
        src={p.mockup}
        alt={p.name}
        className="absolute inset-0 w-full h-full object-cover"
        initial={false}
        animate={{ opacity: i === idx ? 1 : 0, scale: i === idx && scaleActive ? 1.05 : 1 }}
        transition={{ duration: 1.6, ease: [0.22, 0.61, 0.36, 1] }}
      />
    ))}
  </>
);

const ClientBar = ({ name, verified, small = false }) => (
  <div className={`absolute bottom-2.5 left-2.5 glass-strong rounded-full ${small ? "pl-1 pr-2 py-0.5" : "pl-1.5 pr-2.5 py-1"} flex items-center gap-1.5 max-w-fit`}>
    <span className={`${small ? "w-4 h-4 text-[8.5px]" : "w-5 h-5 text-[9.5px]"} rounded-full bg-white/10 grid place-items-center font-semibold`}>{name.charAt(0)}</span>
    <span className={`${small ? "text-[10.5px]" : "text-[11.5px]"} font-medium`}>{name}</span>
    {verified && <BadgeCheck className={`${small ? "w-2.5 h-2.5" : "w-3 h-3"} text-sky-400`} />}
  </div>
);

export default Hero;

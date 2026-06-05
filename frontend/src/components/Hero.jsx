import React, { useEffect, useState } from "react";
import { ArrowUpRight, BadgeCheck, Play } from "lucide-react";
import { PROJECTS, ASSETS } from "../mock";
import useReveal from "../hooks/useReveal";

const Hero = () => {
  const [titleRef, titleIn] = useReveal();
  const [gridRef, gridIn] = useReveal();
  const [idx, setIdx] = useState(0);
  const [bottomIdx, setBottomIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % PROJECTS.length), 3500);
    const id2 = setInterval(() => setBottomIdx((i) => (i + 1) % PROJECTS.length), 4200);
    // start bottom carousel at offset for visual variety
    setBottomIdx(3);
    return () => { clearInterval(id); clearInterval(id2); };
  }, []);

  const current = PROJECTS[idx];
  const bottom = PROJECTS[bottomIdx];

  return (
    <section id="home" className="relative pt-28 sm:pt-32 pb-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[1300px] h-[700px] blue-glow" />
        <div className="absolute top-0 left-0 right-0 h-[900px] grid-bg opacity-50 [mask-image:radial-gradient(ellipse_at_center,_black_30%,_transparent_70%)]" />
        <div className="absolute top-10 left-10 w-[260px] h-[800px] light-beam rotate-12" />
        <div className="absolute top-10 right-10 w-[260px] h-[800px] light-beam -rotate-12" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6">
        {/* Title */}
        <div ref={titleRef} className={`reveal ${titleIn ? "is-in" : ""} text-center mb-8 sm:mb-10`}>
          <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] text-white/80 mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            Booking July · August projects
          </div>
          <h1 className="font-semibold tracking-[-0.035em] leading-[1.02] text-[34px] sm:text-[52px] md:text-[64px] lg:text-[76px]">
            <span className="shine-text">Premium Web, Apps & AI Systems</span>
            <br />
            <span className="shine-text">That Make Customers </span>
            <span className="serif text-white">Buy.</span>
          </h1>
          <p className="mt-5 text-white/55 text-[14.5px] sm:text-[16px] max-w-2xl mx-auto">
            Transforming startups, SMEs, and industry giants into digital leaders.
          </p>
        </div>

        {/* Bento grid */}
        <div ref={gridRef} className={`reveal-stagger ${gridIn ? "is-in" : ""} grid grid-cols-12 grid-rows-[160px_160px_160px] sm:grid-rows-[180px_180px_180px] gap-3 sm:gap-4`}>
          {/* LEFT — stacked */}
          <div className="col-span-12 md:col-span-4 row-span-2 md:row-span-3 grid grid-rows-2 gap-3 sm:gap-4">
            {/* Showcase carousel */}
            <BentoCard className="relative overflow-hidden group">
              {PROJECTS.map((p, i) => (
                <img
                  key={p.id}
                  src={p.mockup}
                  alt={p.name}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ${i === idx ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <ClientBar name={current.name} verified={current.verified} />
            </BentoCard>
            {/* second project carousel (was the tacky text card) */}
            <BentoCard className="relative overflow-hidden group">
              {PROJECTS.map((p, i) => (
                <img
                  key={p.id}
                  src={p.mockup}
                  alt={p.name}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ${i === bottomIdx ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <ClientBar name={bottom.name} verified={bottom.verified} />
            </BentoCard>
          </div>

          {/* CENTER — main showreel */}
          <div className="col-span-12 md:col-span-5 row-span-3 md:row-span-3">
            <BentoCard className="relative overflow-hidden group cursor-pointer h-full">
              <div className="absolute inset-0">
                {PROJECTS.map((p, i) => (
                  <img
                    key={p.id}
                    src={p.mockup}
                    alt=""
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1800ms] ${i === idx ? "opacity-100 scale-105" : "opacity-0 scale-100"} transition-transform`}
                  />
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="glass-strong rounded-full w-20 h-20 grid place-items-center group-hover:scale-110 transition-transform duration-500">
                  <Play className="w-7 h-7 text-white" fill="white" />
                </div>
              </div>
              <div className="absolute left-5 bottom-5 right-5 flex items-end justify-between">
                <div>
                  <div className="text-white text-[15px] font-medium">Dialedbase Showreel</div>
                  <div className="text-white/55 text-[12px]">Preview · 2025</div>
                </div>
                <div className="glass-strong rounded-full px-3 py-1 text-[11px] text-white/75">01:42</div>
              </div>
            </BentoCard>
          </div>

          {/* RIGHT */}
          <div className="col-span-12 md:col-span-3 row-span-2 md:row-span-3 grid grid-rows-2 gap-3 sm:gap-4">
            {/* See All Work */}
            <BentoCard className="relative overflow-hidden group flex items-center justify-center">
              <div className="absolute inset-0 card-inner-grid opacity-40" />
              <a
                href="#work"
                className="relative btn-sheen group inline-flex items-center gap-2 bg-white text-black rounded-full pl-5 pr-1.5 py-1.5 text-[14px] font-medium"
              >
                See All Work
                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </a>
            </BentoCard>
            {/* Founder card */}
            <BentoCard className="relative overflow-hidden group">
              <img
                src={ASSETS.rhys}
                alt="Rhys Evans"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: "center 25%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <ClientBar name="Rhys Evans" verified />
            </BentoCard>
          </div>
        </div>
      </div>
    </section>
  );
};

const BentoCard = ({ children, className = "" }) => (
  <div className={`relative glass rounded-3xl overflow-hidden h-full ${className}`}>
    <div className="absolute inset-0 card-inner-grid opacity-30 pointer-events-none" />
    {children}
  </div>
);

const ClientBar = ({ name, verified }) => (
  <div className="absolute left-3 right-3 bottom-3 glass-strong rounded-full pl-2 pr-3 py-1.5 flex items-center gap-2 max-w-fit">
    <span className="w-7 h-7 rounded-full bg-white/10 grid place-items-center text-[11px] font-semibold">{name.charAt(0)}</span>
    <span className="text-[12.5px] font-medium">{name}</span>
    {verified && <BadgeCheck className="w-3.5 h-3.5 text-sky-400" />}
  </div>
);

export default Hero;

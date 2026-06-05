import React, { useEffect, useState } from "react";
import { ArrowUpRight, BadgeCheck, Play } from "lucide-react";
import { PROJECTS, ASSETS } from "../mock";
import useReveal from "../hooks/useReveal";

const Hero = () => {
  const [titleRef, titleIn] = useReveal();
  const [gridRef, gridIn] = useReveal();
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
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] blue-glow" />
        <div className="absolute top-0 left-0 right-0 h-[700px] grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,_black_30%,_transparent_70%)]" />
        <div className="absolute top-10 left-10 w-[220px] h-[700px] light-beam rotate-12 hidden sm:block" />
        <div className="absolute top-10 right-10 w-[220px] h-[700px] light-beam -rotate-12 hidden sm:block" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div ref={titleRef} className={`reveal ${titleIn ? "is-in" : ""} text-center mb-7 sm:mb-9`}>
          <div className="glass inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] text-white/80 mb-4">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
            </span>
            Booking July · August projects
          </div>
          <h1 className="font-semibold tracking-[-0.03em] leading-[1.05] text-[28px] sm:text-[38px] md:text-[46px] lg:text-[54px]">
            <span className="shine-text">Premium Web, Apps & AI Systems</span>
            <br />
            <span className="shine-text">That Make Customers </span>
            <span className="serif text-white">Buy.</span>
          </h1>
          <p className="mt-4 text-white/55 text-[13px] sm:text-[14.5px] max-w-xl mx-auto">
            Transforming startups, SMEs, and industry giants into digital leaders.
          </p>
        </div>

        <div ref={gridRef} className={`reveal-stagger ${gridIn ? "is-in" : ""} grid grid-cols-12 grid-rows-[110px_110px_110px] sm:grid-rows-[130px_130px_130px] md:grid-rows-[140px_140px_140px] gap-2.5 sm:gap-3`}>
          <div className="col-span-12 md:col-span-4 row-span-2 md:row-span-3 grid grid-rows-2 gap-2.5 sm:gap-3">
            <BentoCard>
              {PROJECTS.map((p, i) => (
                <img key={p.id} src={p.mockup} alt={p.name} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ${i === idx ? "opacity-100" : "opacity-0"}`} />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <ClientBar name={current.name} verified={current.verified} />
            </BentoCard>
            <BentoCard>
              {PROJECTS.map((p, i) => (
                <img key={p.id} src={p.mockup} alt={p.name} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ${i === bottomIdx ? "opacity-100" : "opacity-0"}`} />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <ClientBar name={bottom.name} verified={bottom.verified} />
            </BentoCard>
          </div>

          <div className="col-span-12 md:col-span-5 row-span-3 md:row-span-3">
            <BentoCard className="cursor-pointer">
              <div className="absolute inset-0">
                {PROJECTS.map((p, i) => (
                  <img key={p.id} src={p.mockup} alt="" className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1800ms] ${i === idx ? "opacity-100 scale-105" : "opacity-0"}`} />
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="glass-strong rounded-full w-14 h-14 sm:w-16 sm:h-16 grid place-items-center group-hover:scale-110 transition-transform duration-500">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="white" />
                </div>
              </div>
              <div className="absolute left-4 bottom-4 right-4 flex items-end justify-between">
                <div>
                  <div className="text-white text-[13px] font-medium">Dialedbase Showreel</div>
                  <div className="text-white/55 text-[11px]">Preview · 2025</div>
                </div>
                <div className="glass-strong rounded-full px-2.5 py-0.5 text-[10.5px] text-white/75">01:42</div>
              </div>
            </BentoCard>
          </div>

          <div className="col-span-12 md:col-span-3 row-span-2 md:row-span-3 grid grid-rows-2 gap-2.5 sm:gap-3">
            <BentoCard className="flex items-center justify-center">
              <div className="absolute inset-0 card-inner-grid opacity-40" />
              <a href="#work" className="relative btn-sheen group inline-flex items-center gap-1.5 bg-white text-black rounded-full pl-4 pr-1 py-1 text-[13px] font-medium">
                See All Work
                <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </a>
            </BentoCard>
            <BentoCard>
              <img src={ASSETS.rhys} alt="Rhys Evans" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 25%" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <ClientBar name="Rhys Evans" verified />
            </BentoCard>
          </div>
        </div>
      </div>
    </section>
  );
};

const BentoCard = ({ children, className = "" }) => (
  <div className={`relative glass rounded-2xl overflow-hidden h-full group ${className}`}>
    <div className="absolute inset-0 card-inner-grid opacity-25 pointer-events-none" />
    {children}
  </div>
);

const ClientBar = ({ name, verified }) => (
  <div className="absolute left-2.5 bottom-2.5 glass-strong rounded-full pl-1.5 pr-2.5 py-1 flex items-center gap-1.5 max-w-fit">
    <span className="w-5 h-5 rounded-full bg-white/10 grid place-items-center text-[9.5px] font-semibold">{name.charAt(0)}</span>
    <span className="text-[11.5px] font-medium">{name}</span>
    {verified && <BadgeCheck className="w-3 h-3 text-sky-400" />}
  </div>
);

export default Hero;

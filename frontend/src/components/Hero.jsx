import React from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import useReveal from "../hooks/useReveal";

const Hero = () => {
  const [titleRef, titleIn] = useReveal();
  const [subRef, subIn] = useReveal();
  const [ctaRef, ctaIn] = useReveal();

  return (
    <section id="home" className="relative pt-36 sm:pt-44 pb-16 sm:pb-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] blue-glow" />
        <div className="absolute top-0 left-0 right-0 h-[700px] grid-bg opacity-50 [mask-image:radial-gradient(ellipse_at_center,_black_30%,_transparent_70%)]" />
        <div className="absolute top-0 left-10 w-[300px] h-[800px] light-beam rotate-12" />
        <div className="absolute top-0 right-10 w-[300px] h-[800px] light-beam -rotate-12" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div ref={subRef} className={`reveal ${subIn ? "is-in" : ""} flex justify-center mb-6`}>
          <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] text-white/80">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            Booking July · August projects
          </div>
        </div>

        <h1
          ref={titleRef}
          className={`reveal-stagger ${titleIn ? "is-in" : ""} text-center font-semibold tracking-[-0.04em] leading-[0.95] text-[44px] sm:text-[68px] md:text-[88px] lg:text-[104px]`}
        >
          <span className="shine-text block">Premium Web, Apps</span>
          <span className="shine-text block">& AI Systems That Make</span>
          <span className="shine-text block">Customers <span className="serif text-white">Buy.</span></span>
        </h1>

        <p
          ref={subRef}
          className={`reveal ${subIn ? "is-in" : ""} mt-7 text-center text-white/55 text-[15px] sm:text-[17px] max-w-2xl mx-auto leading-relaxed`}
        >
          Dialedbase partners with founders, SMEs and industry leaders to build
          bold digital identities, ship beautiful products, and deploy AI that
          actually works.
        </p>

        <div ref={ctaRef} className={`reveal ${ctaIn ? "is-in" : ""} mt-9 flex items-center justify-center gap-3 flex-wrap`}>
          <a href="#contact" className="btn-sheen group inline-flex items-center gap-2 bg-white text-black rounded-full pl-5 pr-1.5 py-1.5 text-[15px] font-medium">
            Start a project
            <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>
          <a href="#work" className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 text-[14.5px] text-white/90 hover:bg-white/10 transition-colors">
            <Sparkles className="w-4 h-4" />
            See selected work
          </a>
        </div>

        <div className="mt-16 flex items-center justify-center gap-6 text-white/40 text-[12px] tracking-[0.25em] uppercase">
          <span>Design</span><span className="w-1 h-1 rounded-full bg-white/30" />
          <span>Engineering</span><span className="w-1 h-1 rounded-full bg-white/30" />
          <span>AI Systems</span><span className="w-1 h-1 rounded-full bg-white/30" />
          <span>Motion</span>
        </div>
      </div>
    </section>
  );
};

const InlineChip = () => null;

export default Hero;

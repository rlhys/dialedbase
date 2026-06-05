import React from "react";
import { ArrowUpRight, Instagram, MapPin, BadgeCheck } from "lucide-react";
import { ASSETS, TEAM } from "../mock";
import useReveal from "../hooks/useReveal";
import { toast } from "sonner";

const Founder = () => {
  const rhys = TEAM[0];
  const [ref, inView] = useReveal();
  const onBook = () => toast("Booking flow coming soon — mocked.");
  return (
    <section ref={ref} className={`reveal ${inView ? "is-in" : ""} relative py-20 sm:py-28`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-[12px] text-white/75 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> Meet the Founder
          </div>
          <h2 className="font-semibold tracking-[-0.03em] leading-[1.02] text-[40px] sm:text-[56px] md:text-[68px]">
            <span className="shine-text">Founder‑led. Built </span>
            <span className="serif text-white">in‑house.</span>
          </h2>
          <p className="mt-5 text-white/55 max-w-xl mx-auto text-[14.5px] sm:text-[16px]">
            No middlemen. No agency hand‑offs. Every project is led by the builder you brief on day one.
          </p>
        </div>

        <div className="relative glass rounded-[28px] sm:rounded-[36px] overflow-hidden">
          <div className="absolute inset-0 card-inner-grid opacity-30 pointer-events-none" />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Photo */}
            <div className="lg:col-span-5 relative aspect-[4/5] lg:aspect-auto lg:min-h-[640px] overflow-hidden">
              <img src={rhys.img} alt={rhys.name} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 18%" }} />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/0" />
              <div className="absolute top-5 left-5 glass-strong rounded-full px-3 py-1.5 text-[12px] inline-flex items-center gap-2">
                <img src={ASSETS.logoBlack} className="w-4 h-4 rounded" alt="" />
                Dialedbase
              </div>
              <div className="absolute top-5 right-5 glass-strong rounded-full px-3 py-1.5 text-[12px] inline-flex items-center gap-1.5 text-white/85">
                <MapPin className="w-3.5 h-3.5" /> Marbella · London
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between gap-10">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.02em]">{rhys.name}</h3>
                  <BadgeCheck className="w-6 h-6 text-sky-400" />
                </div>
                <div className="mt-2 text-white/55 text-[14.5px]">{rhys.role} · Dialedbase</div>
                <p className="mt-6 text-white/75 leading-relaxed text-[15px] sm:text-[16px] max-w-xl">
                  Rhys is a designer and engineer building beautiful, fast, AI‑native products for ambitious brands. From luxury hospitality to high‑growth SaaS, he leads every Dialedbase project end‑to‑end.
                </p>

                {/* stats */}
                <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
                  {[
                    { k: "Years", v: "6+" },
                    { k: "Clients", v: "40+" },
                    { k: "Countries", v: "12" },
                  ].map((s) => (
                    <div key={s.k} className="glass rounded-2xl p-4">
                      <div className="shine-text text-2xl sm:text-3xl font-semibold tracking-tight">{s.v}</div>
                      <div className="text-[11px] text-white/50 mt-1 tracking-[0.2em] uppercase">{s.k}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button onClick={onBook} className="btn-sheen group inline-flex items-center gap-2 bg-white text-black rounded-full pl-5 pr-1.5 py-1.5 text-[14.5px] font-medium">
                  Work with Rhys
                  <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </button>
                <a href={rhys.socials.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-[13.5px] text-white/85 hover:bg-white/10">
                  <Instagram className="w-4 h-4" /> @rhysgbp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;

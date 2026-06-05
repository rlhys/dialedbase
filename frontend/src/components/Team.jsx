import React from "react";
import { ArrowUpRight, Instagram, MapPin } from "lucide-react";
import { ASSETS, TEAM } from "../mock";
import { toast } from "sonner";
import useReveal from "../hooks/useReveal";

const Team = () => {
  const rhys = TEAM[0];
  const onBook = () => toast("Booking flow coming soon — mocked.");
  const [ref, inView] = useReveal();
  return (
    <section id="about" ref={ref} className={`reveal ${inView ? "is-in" : ""} relative py-24 sm:py-32`}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-[12px] text-white/75 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> Founder‑led studio
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-[-0.03em] leading-[0.95]">
              <span className="shine-text">Bridging design,</span>
              <br />
              <span className="shine-text">engineering & AI.</span>
            </h2>
            <p className="mt-6 text-white/55 max-w-xl">
              Dialedbase is built from the ground up by operators who design and code. No middlemen, no fluff — just a tight squad shipping work the internet remembers.
            </p>
            <div className="mt-7 flex items-center gap-3 flex-wrap">
              <button onClick={onBook} className="btn-sheen group inline-flex items-center gap-2 bg-white text-black rounded-full pl-5 pr-1.5 py-1.5 text-[14.5px] font-medium">
                Book a Call Today
                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </button>
              <a href={rhys.socials.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-[13.5px] text-white/80 hover:bg-white/10">
                <Instagram className="w-4 h-4" /> @dialedbase
              </a>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3">
            {[
              { k: "Years", v: "6+" },
              { k: "Clients", v: "40+" },
              { k: "Countries", v: "12" },
            ].map((s) => (
              <div key={s.k} className="glass rounded-2xl p-4">
                <div className="shine-text text-3xl font-semibold tracking-tight">{s.v}</div>
                <div className="text-[12px] text-white/50 mt-1 tracking-widest uppercase">{s.k}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative glass rounded-3xl overflow-hidden">
            <div className="absolute inset-0 card-inner-grid opacity-30" />
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <img src={rhys.img} alt={rhys.name} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 18%" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute top-4 left-4 glass-strong rounded-full px-3 py-1.5 text-[12px] inline-flex items-center gap-2">
                <img src={ASSETS.logoBlack} className="w-4 h-4 rounded" alt="" />
                Dialedbase · Founder
              </div>
              <div className="absolute top-4 right-4 glass-strong rounded-full px-3 py-1.5 text-[12px] inline-flex items-center gap-1.5 text-white/80">
                <MapPin className="w-3.5 h-3.5" /> Marbella · London
              </div>
              <div className="absolute left-5 right-5 bottom-5">
                <div className="text-2xl sm:text-3xl font-semibold tracking-tight">{rhys.name}</div>
                <div className="text-white/60 text-[13px] mt-1">{rhys.role}</div>
                <p className="mt-3 text-white/70 text-[13.5px] leading-relaxed max-w-sm">{rhys.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;

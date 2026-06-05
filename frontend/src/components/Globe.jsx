import React from "react";
import { Globe as GlobeIcon } from "lucide-react";
import { ASSETS } from "../mock";
import useReveal from "../hooks/useReveal";
import { toast } from "sonner";

const Globe = () => {
  const [ref, inView] = useReveal();
  const onBook = () => toast("Booking flow coming soon — mocked.");

  return (
    <section id="about" ref={ref} className={`reveal ${inView ? "is-in" : ""} relative py-14 sm:py-20`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-black border border-white/[0.08]">
          <div className="absolute inset-0 card-inner-grid opacity-20 pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[420px] sm:min-h-[480px] lg:min-h-[520px]">
            <div className="p-7 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 glass rounded-full px-2.5 py-1 text-[11px] text-white/75 mb-5">
                  <GlobeIcon className="w-3 h-3" /> Our Global Team
                </div>
                <h2 className="font-semibold tracking-[-0.03em] leading-[1.05] text-[34px] sm:text-[44px] lg:text-[54px] max-w-[14ch]">
                  <span className="shine-text">Bridging Cultures,</span>
                  <br />
                  <span className="shine-text">Driving </span>
                  <span className="serif text-white">Innovation.</span>
                </h2>
              </div>

              <div className="mt-8">
                <button onClick={onBook} className="group inline-flex items-center gap-2.5 glass-strong rounded-full pl-3 pr-1 py-1 hover:bg-white/[0.08] transition-colors">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-[13px] text-white pr-1">Book a Call Today</span>
                  <span className="w-7 h-7 rounded-full ring-2 ring-black overflow-hidden">
                    <img src={ASSETS.rhys} alt="Rhys" className="w-full h-full object-cover" style={{ objectPosition: "center 22%" }} />
                  </span>
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden min-h-[340px] lg:min-h-0">
              <div className="absolute inset-0 grid place-items-center">
                <div className="relative w-[360px] h-[360px] sm:w-[460px] sm:h-[460px] lg:w-[540px] lg:h-[540px]">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-500/15 via-violet-700/10 to-transparent blur-3xl" />
                  <div className="absolute inset-[6%] rounded-full overflow-hidden" style={{
                    background: "radial-gradient(circle at 30% 28%, rgba(60,80,120,0.4), rgba(15,18,40,0.85) 45%, rgba(2,4,12,1) 80%)",
                    boxShadow: "inset -40px -40px 120px rgba(0,0,0,0.85), inset 30px 30px 80px rgba(80,120,200,0.08)",
                  }}>
                    <div className="absolute inset-0 spin-slow" style={{
                      background: "radial-gradient(ellipse 1% 0.5% at 22% 32%, rgba(255,200,100,0.95), transparent 60%), radial-gradient(ellipse 0.8% 0.4% at 24% 36%, rgba(255,190,90,0.9), transparent 60%), radial-gradient(ellipse 1.2% 0.6% at 28% 30%, rgba(255,210,120,0.85), transparent 60%), radial-gradient(ellipse 1% 0.5% at 32% 38%, rgba(255,200,100,0.95), transparent 60%), radial-gradient(ellipse 0.7% 0.35% at 26% 44%, rgba(255,180,80,0.8), transparent 60%), radial-gradient(ellipse 1% 0.5% at 35% 28%, rgba(255,200,100,0.7), transparent 60%), radial-gradient(ellipse 0.6% 0.3% at 40% 32%, rgba(255,180,80,0.7), transparent 60%), radial-gradient(ellipse 1% 0.5% at 38% 50%, rgba(255,210,120,0.85), transparent 60%), radial-gradient(ellipse 0.8% 0.4% at 44% 46%, rgba(255,200,100,0.8), transparent 60%), radial-gradient(ellipse 1.2% 0.6% at 50% 38%, rgba(255,210,120,0.9), transparent 60%), radial-gradient(ellipse 0.8% 0.4% at 56% 44%, rgba(255,190,90,0.85), transparent 60%), radial-gradient(ellipse 1% 0.5% at 62% 36%, rgba(255,200,100,0.85), transparent 60%), radial-gradient(ellipse 0.7% 0.35% at 66% 42%, rgba(255,180,80,0.7), transparent 60%), radial-gradient(ellipse 1% 0.5% at 70% 50%, rgba(255,200,100,0.85), transparent 60%), radial-gradient(ellipse 0.8% 0.4% at 74% 54%, rgba(255,180,80,0.75), transparent 60%), radial-gradient(ellipse 1% 0.5% at 50% 60%, rgba(255,200,100,0.7), transparent 60%), radial-gradient(ellipse 0.6% 0.3% at 55% 65%, rgba(255,180,80,0.65), transparent 60%), radial-gradient(ellipse 0.8% 0.4% at 30% 65%, rgba(255,190,90,0.7), transparent 60%), radial-gradient(ellipse 0.6% 0.3% at 36% 72%, rgba(255,180,80,0.6), transparent 60%), radial-gradient(ellipse 1% 0.5% at 60% 25%, rgba(255,210,120,0.85), transparent 60%), radial-gradient(ellipse 0.6% 0.3% at 78% 30%, rgba(255,190,90,0.7), transparent 60%)",
                      filter: "blur(0.3px)",
                    }} />
                    <div className="absolute inset-0 rounded-full" style={{
                      background: "radial-gradient(circle at 78% 22%, rgba(255,255,255,0.45), rgba(255,255,255,0.12) 12%, transparent 28%)",
                    }} />
                    <div className="absolute inset-0 rounded-full" style={{
                      background: "radial-gradient(circle at 25% 80%, rgba(0,0,0,0.7), transparent 60%)",
                    }} />
                  </div>
                  <div className="absolute inset-[2%] rounded-full pointer-events-none" style={{
                    boxShadow: "0 0 60px 10px rgba(120,180,255,0.12), 0 0 120px 30px rgba(80,140,255,0.06)",
                  }} />
                  <div className="absolute left-[32%] top-[40%] glass-strong rounded-md px-2 py-1 text-[9.5px] leading-tight">
                    <div className="font-semibold text-white">Marbella, Spain</div>
                    <div className="text-white/55 text-[8.5px]">36.5099° N, 4.8866° W</div>
                  </div>
                  <div className="absolute left-[56%] top-[58%] glass-strong rounded-md px-2 py-1 text-[9.5px] leading-tight">
                    <div className="font-semibold text-white">London, UK</div>
                    <div className="text-white/55 text-[8.5px]">51.5074° N, 0.1278° W</div>
                  </div>
                </div>
              </div>

              <video src={ASSETS.planetVideo} autoPlay muted playsInline loop preload="auto" className="absolute inset-0 w-full h-full object-cover" />

              {/* edge fades - softer so the container blends across both halves */}
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black via-black/70 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Globe;

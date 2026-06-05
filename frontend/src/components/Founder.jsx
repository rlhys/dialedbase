import React from "react";
import { ArrowUpRight, Instagram, MapPin, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";
import { ASSETS, TEAM } from "../mock";
import { FadeIn, Magnetic } from "./Motion";
import { useContact } from "./ContactFlow";

const Founder = () => {
  const rhys = TEAM[0];
  const { open: onBook } = useContact();
  return (
    <section className="relative py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <FadeIn>
            <div className="inline-flex items-center gap-1.5 glass rounded-full px-2.5 py-1 text-[11px] text-white/75 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> Meet the Founder
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="font-semibold tracking-[-0.03em] leading-[1.05] text-[26px] xs:text-[30px] sm:text-[38px] md:text-[46px]">
              <span className="shine-text">Founder‑led. Built </span>
              <span className="serif text-white">in‑house.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 text-white/55 max-w-lg mx-auto text-[13.5px] sm:text-[14.5px] px-2">
              No middlemen. No agency hand‑offs. Every project is led by the builder you brief on day one.
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.05}>
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative glass glass-hover rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 card-inner-grid opacity-25 pointer-events-none" />
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-5 relative aspect-[4/5] lg:aspect-auto lg:min-h-[460px] overflow-hidden">
                <motion.img
                  src={rhys.img}
                  alt={rhys.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: "center 18%" }}
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: [0.22, 0.61, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 glass-strong rounded-full px-2.5 py-1 text-[11px] inline-flex items-center gap-1.5">
                  <img src={ASSETS.logoBlack} className="w-3.5 h-3.5 rounded" alt="" />
                  Dialedbase
                </div>
                <div className="absolute top-4 right-4 glass-strong rounded-full px-2.5 py-1 text-[11px] inline-flex items-center gap-1 text-white/85">
                  <MapPin className="w-3 h-3" /> Marbella · London
                </div>
              </div>

              <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between gap-8">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-[24px] sm:text-[30px] lg:text-[36px] font-semibold tracking-[-0.02em]">{rhys.name}</h3>
                    <BadgeCheck className="w-5 h-5 text-sky-400" />
                  </div>
                  <div className="mt-1 text-white/55 text-[13px]">{rhys.role} · Dialedbase</div>
                  <p className="mt-5 text-white/75 leading-relaxed text-[13.5px] sm:text-[14.5px] max-w-xl">
                    Rhys is a designer and engineer building beautiful, fast, AI‑native products for ambitious brands. From luxury hospitality to high‑growth SaaS, he leads every Dialedbase project end‑to‑end.
                  </p>

                  <div className="mt-6 grid grid-cols-3 gap-2.5 max-w-md">
                    {[
                      { k: "Years", v: "6+" },
                      { k: "Clients", v: "40+" },
                      { k: "Countries", v: "12" },
                    ].map((s, i) => (
                      <motion.div
                        key={s.k}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.08, duration: 0.7 }}
                        className="glass rounded-xl p-3"
                      >
                        <div className="shine-text text-xl sm:text-2xl font-semibold tracking-tight">{s.v}</div>
                        <div className="text-[10px] text-white/50 mt-0.5 tracking-[0.18em] uppercase">{s.k}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <Magnetic strength={0.25}>
                    <button onClick={onBook} className="btn-sheen group inline-flex items-center gap-2 bg-white text-black rounded-full pl-4 pr-1 py-1 text-[13px] font-medium">
                      Work with Rhys
                      <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </button>
                  </Magnetic>
                  <a href={rhys.socials.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 glass glass-hover rounded-full px-3 py-1.5 text-[12.5px] text-white/85 hover:bg-white/10 transition-colors">
                    <Instagram className="w-3.5 h-3.5" /> @rhysgbp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Founder;

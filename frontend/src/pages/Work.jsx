import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { WordByWord } from "../components/SpacedHeader";
import { FadeIn, Stagger, StaggerItem, Tilt } from "../components/Motion";
import { WORKS, INDUSTRIES } from "../data/extra";
import { useContact } from "../components/ContactFlow";

const CATEGORIES = ["All", "Web & Motion", "SaaS Platform", "Mobile App", "AI"];

const Work = () => {
  const [cat, setCat] = useState("All");
  const { open } = useContact();

  const filtered = useMemo(() => {
    if (cat === "All") return WORKS;
    return WORKS.filter((w) => w.tag === cat || (cat === "AI" && /AI/i.test(w.tag)));
  }, [cat]);

  return (
    <div className="relative pt-24 sm:pt-28">
      {/* HERO */}
      <section className="relative pb-8 sm:pb-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] blue-glow" />
          <div className="absolute top-0 left-0 right-0 h-[500px] grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,_black_30%,_transparent_70%)]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="glass inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[11px] text-white/80 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Selected Work
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="font-semibold tracking-[-0.03em] leading-[1.02] text-[32px] sm:text-[46px] md:text-[60px] lg:text-[72px] max-w-[18ch]">
              <span className="shine-text">Tech that feels premium. </span>
              <span className="serif text-white">Brands people remember.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="mt-5 text-white/55 text-[14.5px] sm:text-[16px] max-w-2xl leading-relaxed">
              A growing library of websites, apps and AI systems engineered to compound our partners' growth.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* FILTERS */}
      <section className="relative pt-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="glass rounded-full p-1 inline-flex flex-wrap items-center gap-1">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`relative px-3.5 py-1.5 text-[12.5px] rounded-full transition-colors ${
                    cat === c ? "text-black" : "text-white/70 hover:text-white"
                  }`}
                >
                  {cat === c && (
                    <motion.span
                      layoutId="work-pill"
                      className="absolute inset-0 rounded-full bg-white"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{c}</span>
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* GRID */}
      <section className="relative py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Stagger gap={0.06} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filtered.map((p) => (
              <StaggerItem key={p.id}>
                <Tilt max={4}>
                  <motion.article
                    whileHover={{ scale: 1.015 }}
                    transition={{ type: "spring", stiffness: 240, damping: 20 }}
                    className="relative glass glass-hover rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer"
                  >
                    <img src={p.mockup} alt={p.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1400ms] ease-out" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    <div className="absolute top-3 left-3 glass-strong rounded-full px-2.5 py-1 text-[10.5px] text-white/80">
                      {p.tag}
                    </div>
                    <div className="absolute left-3 right-3 bottom-3 flex items-end justify-between gap-3">
                      <div className="glass-strong rounded-full pl-1.5 pr-2.5 py-1 flex items-center gap-1.5 max-w-fit">
                        <span className="w-5 h-5 rounded-full bg-white/10 grid place-items-center text-[9.5px] font-semibold">{p.name.charAt(0)}</span>
                        <span className="text-[11.5px] font-medium">{p.name}</span>
                        <BadgeCheck className="w-3 h-3 text-sky-400" />
                      </div>
                      <span className="w-9 h-9 rounded-full bg-white text-black grid place-items-center group-hover:rotate-45 transition-transform duration-300">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </motion.article>
                </Tilt>
              </StaggerItem>
            ))}
          </Stagger>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-white/45 text-[14px]">No projects in this category yet.</div>
          )}
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="relative py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="inline-flex items-center gap-1.5 glass rounded-full px-2.5 py-1 text-[11px] text-white/75 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> Industries
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <WordByWord
              text="Driving innovation across diverse industries."
              className="font-semibold tracking-[-0.03em] leading-[1.05] text-[28px] sm:text-[38px] md:text-[48px] lg:text-[56px] max-w-[20ch]"
            />
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-4 text-white/55 max-w-xl text-[14px]">Our experience fuels tailored solutions for every unique challenge.</p>
          </FadeIn>

          <Stagger gap={0.06} className="mt-8 flex flex-wrap gap-2.5">
            {INDUSTRIES.map((i) => (
              <StaggerItem key={i}>
                <div className="glass rounded-full px-4 py-2 text-[13px] sm:text-[14px] text-white/85 hover:bg-white/10 transition-colors">{i}</div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-10 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <h3 className="font-semibold tracking-[-0.03em] leading-[1.05] text-[28px] sm:text-[38px] md:text-[46px]">
              <span className="shine-text">Have a project </span>
              <span className="serif text-white">in mind?</span>
            </h3>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-3 text-white/55 text-[14px] sm:text-[15.5px]">Let's talk about how we can help. We typically respond within a few hours.</p>
          </FadeIn>
          <FadeIn delay={0.18}>
            <button onClick={open} className="mt-6 btn-sheen group inline-flex items-center gap-2 bg-white text-black rounded-full pl-1 pr-5 py-1 text-[14px] font-medium">
              <span className="w-8 h-8 rounded-full bg-black text-white grid place-items-center group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
              Start a project
            </button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default Work;

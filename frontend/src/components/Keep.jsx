import React from "react";
import { ArrowUpRight, Check, Layers, Smartphone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn, Stagger, StaggerItem, Magnetic, Tilt } from "./Motion";
import { useContact } from "./ContactFlow";

const OFFERS = [
  {
    id: "product-keep",
    title: "Product Keep",
    eyebrow: "For apps · dashboards · booking platforms",
    price: "From £2.5k / mo",
    desc: "Stay on as the senior builder after launch — feature velocity, bugfix, Stripe/auth edge cases, and a monthly roadmap call so the product keeps compounding.",
    points: [
      "Priority fixes & ops hygiene",
      "Scoped feature days each month",
      "Monthly roadmap with Rhys",
      "3‑month minimum",
    ],
    icon: Smartphone,
  },
  {
    id: "site-care",
    title: "Site Care",
    eyebrow: "For brand · marketing sites",
    price: "From £1.5k / mo",
    desc: "Ongoing craft for the surface that sells you — new landing sections, CMS updates, CRO tweaks, performance/SEO hygiene, and design polish when the brand moves.",
    points: [
      "Content & CMS updates",
      "Landing pages & conversion tweaks",
      "Performance & SEO hygiene",
      "3‑month minimum",
    ],
    icon: Layers,
  },
];

const Keep = () => {
  const { open: onBook } = useContact();

  return (
    <section id="keep" className="relative py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <FadeIn>
            <div className="inline-flex items-center gap-1.5 glass rounded-full px-2.5 py-1 text-[11px] text-white/75 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Build → Keep
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="font-semibold tracking-[-0.03em] leading-[1.05] text-[28px] xs:text-[32px] sm:text-[42px] md:text-[52px]">
              <span className="shine-text">Launch is the start. </span>
              <span className="serif text-white">Keep is the product.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-4 text-white/55 max-w-xl mx-auto text-[13.5px] sm:text-[14.5px] px-2">
              Every build ships with a Keep proposal on the table — so you are not blocked on every Stripe edge case, owner request, or landing-page change.
            </p>
          </FadeIn>
        </div>

        <Stagger gap={0.09} className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {OFFERS.map((o) => {
            const Icon = o.icon;
            return (
              <StaggerItem key={o.id}>
                <Tilt max={3}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className="relative glass glass-hover rounded-2xl p-5 sm:p-6 overflow-hidden group h-full flex flex-col"
                  >
                    <div className="absolute inset-0 card-inner-grid opacity-25 [mask-image:radial-gradient(ellipse_at_top_right,_black,_transparent_70%)]" />
                    <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-sky-400/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <motion.div
                          whileHover={{ rotate: 8 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          className="shrink-0 w-10 h-10 rounded-xl glass-strong grid place-items-center"
                        >
                          <Icon className="w-4 h-4 text-white" />
                        </motion.div>
                        <span className="text-[10.5px] text-white/45 tracking-wide uppercase pt-1">{o.eyebrow}</span>
                      </div>
                      <h3 className="mt-4 text-[19px] sm:text-[22px] font-semibold tracking-[-0.015em]">{o.title}</h3>
                      <div className="mt-1.5 text-[13px] sm:text-[14px] text-white/85 font-medium tracking-tight">{o.price}</div>
                      <p className="mt-2 text-white/55 leading-relaxed text-[13px] sm:text-[13.5px]">{o.desc}</p>
                      <ul className="mt-4 space-y-1.5">
                        {o.points.map((pt) => (
                          <li key={pt} className="flex items-center gap-1.5 text-[12.5px] text-white/65">
                            <Check className="w-3 h-3 text-emerald-400 shrink-0" /> {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="relative mt-6">
                      <Magnetic strength={0.2}>
                        <button
                          onClick={onBook}
                          className="btn-sheen group inline-flex items-center gap-2 bg-white text-black rounded-full pl-4 pr-1 py-1 text-[13px] font-medium"
                        >
                          Ask about {o.title}
                          <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </button>
                      </Magnetic>
                    </div>
                  </motion.div>
                </Tilt>
              </StaggerItem>
            );
          })}
        </Stagger>

        <FadeIn delay={0.2}>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
            <p className="text-white/45 text-[12.5px] sm:text-[13px] max-w-md">
              Final scope set on the strategy call. One founder face — no junior bench.
            </p>
            <a
              href="mailto:hello@dialedbase.com"
              className="inline-flex items-center gap-1.5 glass glass-hover rounded-full px-3 py-1.5 text-[12.5px] text-white/85 hover:bg-white/10 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" /> hello@dialedbase.com
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Keep;

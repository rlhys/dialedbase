import React from "react";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "../mock";
import { toast } from "sonner";

const Row = ({ reverse = false, speed = "marquee-track" }) => (
  <div className="overflow-hidden py-3">
    <div className={`flex gap-5 ${speed}`} style={{ width: "max-content", animationDirection: reverse ? "reverse" : "normal" }}>
      {[...PROJECTS, ...PROJECTS].map((p, i) => (
        <div key={i} className="shrink-0 w-[380px] sm:w-[480px] aspect-[16/10] rounded-2xl glass overflow-hidden relative">
          <img src={p.mockup} alt={p.name} className="absolute inset-0 w-full h-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-3 left-3 glass-strong rounded-full px-3 py-1 text-[12px]">{p.name}</div>
        </div>
      ))}
    </div>
  </div>
);

const FinalCTA = () => {
  const onBook = () => toast("Mocked: opens Calendly in production.");
  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h2 className="text-5xl sm:text-7xl md:text-[120px] font-semibold tracking-[-0.04em] leading-[0.92]">
          <span className="shine-text">Lead in Your</span>
          <br />
          <span className="shine-text">Industry.</span>
        </h2>
        <p className="mt-7 text-white/55 max-w-xl mx-auto">
          Ready to stand out from the competition? Let's build something extraordinary together and take your brand to the next level.
        </p>
        <button onClick={onBook} className="mt-8 btn-sheen group inline-flex items-center gap-2 bg-white text-black rounded-full pl-6 pr-1.5 py-2 text-[15px] font-medium">
          Book a call
          <span className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </button>
      </div>

      <div className="space-y-2">
        <Row />
        <Row reverse speed="marquee-track-slow" />
      </div>
    </section>
  );
};

export default FinalCTA;

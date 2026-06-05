import React from "react";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { PROJECTS } from "../mock";
import useReveal from "../hooks/useReveal";
import { toast } from "sonner";

const FinalCTA = () => {
  const [ref, inView] = useReveal();
  const onBook = () => toast("Mocked: this opens Calendly in production.");

  // grid mockups: take 8 from PROJECTS (loop)
  const tiles = [...PROJECTS, ...PROJECTS].slice(0, 8);

  // positions: top-left, top-mid, top-right, mid-left, mid-right, bottom-left, bottom-mid, bottom-right (8 around center)
  const positions = [
    "absolute hidden md:block top-[2%] left-[2%] w-[22%] aspect-[16/10] rotate-[-6deg]",
    "absolute hidden lg:block top-[0%] left-[28%] w-[18%] aspect-[16/10] rotate-[3deg]",
    "absolute hidden md:block top-[4%] right-[2%] w-[22%] aspect-[16/10] rotate-[6deg]",
    "absolute hidden md:block top-[42%] left-[-2%] w-[20%] aspect-[16/10] rotate-[-4deg]",
    "absolute hidden md:block top-[40%] right-[-2%] w-[20%] aspect-[16/10] rotate-[5deg]",
    "absolute hidden md:block bottom-[2%] left-[4%] w-[22%] aspect-[16/10] rotate-[4deg]",
    "absolute hidden lg:block bottom-[4%] left-[30%] w-[18%] aspect-[16/10] rotate-[-3deg]",
    "absolute hidden md:block bottom-[2%] right-[3%] w-[22%] aspect-[16/10] rotate-[-5deg]",
  ];

  return (
    <section id="contact" ref={ref} className={`reveal ${inView ? "is-in" : ""} relative py-28 sm:py-36 overflow-hidden`}>
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="relative h-[640px] sm:h-[720px] md:h-[820px] lg:h-[900px] flex items-center justify-center">
          {/* scattered mockups */}
          {tiles.map((p, i) => (
            <div
              key={i}
              className={`${positions[i]} fly-in rounded-2xl glass overflow-hidden group hover:scale-[1.04] hover:rotate-0 transition-transform duration-700`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <img src={p.mockup} alt={p.name} className="absolute inset-0 w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 glass-strong rounded-full pl-2 pr-3 py-1 text-[11px] inline-flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-white/10 grid place-items-center text-[9px] font-semibold">{p.name.charAt(0)}</span>
                {p.name}
                {p.verified && <BadgeCheck className="w-3 h-3 text-sky-400" />}
              </div>
            </div>
          ))}

          {/* centered text */}
          <div className="relative z-10 text-center max-w-3xl px-2 sm:px-4">
            <h2 className="font-semibold tracking-[-0.04em] leading-[0.92] text-[56px] sm:text-[84px] md:text-[120px]">
              <span className="shine-text">Lead in Your</span>
              <br />
              <span className="shine-text">Industry.</span>
            </h2>
            <p className="mt-6 text-white/55 max-w-md mx-auto text-[15px] sm:text-[17px] leading-relaxed">
              Ready to stand out from the competition? Let's build something extraordinary together and take your brand to the next level.
            </p>
            <button onClick={onBook} className="mt-8 btn-sheen group inline-flex items-center gap-2 bg-white text-black rounded-full pl-6 pr-1.5 py-2 text-[15px] font-medium">
              Book a call
              <span className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

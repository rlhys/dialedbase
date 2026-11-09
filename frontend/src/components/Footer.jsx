import React from "react";
import { Instagram, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ASSETS } from "../mock";
import { useContact } from "./ContactFlow";

const Footer = () => {
  const { open: openContact } = useContact();
  const handleContact = (e) => { e.preventDefault(); openContact(); };

  return (
    <footer className="relative pt-16 pb-8 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10">
          <div className="md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <img src={ASSETS.logoBlack} alt="" className="w-8 h-8 rounded-lg" />
              <div>
                <div className="text-[17px] font-semibold tracking-tight">Dialedbase</div>
                <div className="text-[11px] text-white/45">Design & Technology</div>
              </div>
            </Link>
            <p className="mt-4 text-white/55 max-w-sm text-[13.5px] leading-relaxed">
              Premium websites and operator products - then Dialedbase stays on Keep so they keep compounding.
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="text-[10.5px] text-white/40 tracking-[0.2em] uppercase mb-3">Studio</div>
            <ul className="space-y-1.5 text-[13px] text-white/70">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/work" className="hover:text-white">Work</Link></li>
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><a href="#contact" onClick={handleContact} className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="text-[10.5px] text-white/40 tracking-[0.2em] uppercase mb-3">Offers</div>
            <ul className="space-y-1.5 text-[13px] text-white/70">
              <li>Product systems</li>
              <li>Brand sites</li>
              <li><a href="#keep" className="hover:text-white">Product Keep</a></li>
              <li><a href="#keep" className="hover:text-white">Site Care</a></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <div className="text-[10.5px] text-white/40 tracking-[0.2em] uppercase mb-3">Get in touch</div>
            <a href="#contact" onClick={handleContact} className="inline-flex items-center gap-1.5 text-[13.5px] hover:text-white text-white/85">
              Book a strategy call <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <div className="mt-3">
              <a href="mailto:hello@dialedbase.com" className="text-[13px] text-white/70 hover:text-white">
                hello@dialedbase.com
              </a>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <a href="https://instagram.com/dialedbase" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full glass hover:bg-white/10 px-3 py-2 text-[12.5px] text-white/80 transition-colors">
                <Instagram className="w-3.5 h-3.5" />
                <span>@dialedbase</span>
              </a>
            </div>
          </div>
        </div>

        <div className="relative my-6 select-none overflow-hidden px-2">
          <a href="https://dialedbase.com" className="block text-center no-underline group" aria-label="Dialedbase">
            <div className="text-[clamp(2.75rem,7vw,5.75rem)] leading-[0.9] font-semibold tracking-[-0.05em] shine-text whitespace-nowrap transition group-hover:opacity-90">
              Dialedbase
            </div>
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-white/5 text-[11.5px] text-white/40">
          <div className="flex items-center gap-2.5">
            <a
              href="https://dialedbase.com"
              className="group inline-flex items-center gap-2 text-white/55 hover:text-white transition-colors"
              aria-label="Dialedbase home"
            >
              <img
                src="/images/dialedbase-mark.png"
                alt="Dialedbase"
                className="h-7 w-7 rounded-[0.5rem] object-cover shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
              />
              <span className="font-medium underline-offset-4 group-hover:underline">Dialedbase</span>
            </a>
            <span>· © {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-4">
            <a className="hover:text-white" href="#">Privacy</a>
            <a className="hover:text-white" href="#">Terms</a>
            <span>Crafted with obsession.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

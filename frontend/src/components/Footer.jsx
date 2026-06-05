import React from "react";
import { Instagram, ArrowUpRight } from "lucide-react";
import { ASSETS } from "../mock";

const Footer = () => {
  return (
    <footer className="relative pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12">
          <div className="md:col-span-5">
            <a href="#home" className="inline-flex items-center gap-3">
              <img src={ASSETS.logoBlack} alt="" className="w-10 h-10 rounded-xl" />
              <div>
                <div className="text-xl font-semibold tracking-tight">Dialedbase</div>
                <div className="text-[12px] text-white/45">Design & Technology</div>
              </div>
            </a>
            <p className="mt-5 text-white/55 max-w-sm text-[14.5px] leading-relaxed">
              Websites, apps and AI systems engineered to compound your brand's growth.
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="text-[12px] text-white/40 tracking-widest uppercase mb-4">Studio</div>
            <ul className="space-y-2 text-[14px] text-white/75">
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#work" className="hover:text-white">Work</a></li>
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="text-[12px] text-white/40 tracking-widest uppercase mb-4">Capabilities</div>
            <ul className="space-y-2 text-[14px] text-white/75">
              <li>Websites</li>
              <li>Mobile & Web Apps</li>
              <li>AI Systems</li>
              <li>Brand & Motion</li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <div className="text-[12px] text-white/40 tracking-widest uppercase mb-4">Get in touch</div>
            <a href="mailto:hello@dialedbase.com" className="inline-flex items-center gap-2 text-[15px] hover:text-white text-white/85">
              hello@dialedbase.com <ArrowUpRight className="w-4 h-4" />
            </a>
            <div className="mt-5 flex items-center gap-2">
              <a href="https://instagram.com/rhysgbp" target="_blank" rel="noreferrer" className="w-10 h-10 grid place-items-center rounded-full glass hover:bg-white/10">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* huge wordmark */}
        <div className="relative my-10 select-none">
          <div className="text-[20vw] sm:text-[18vw] leading-[0.85] font-semibold tracking-[-0.05em] shine-text whitespace-nowrap text-center">
            Dialedbase
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/5 text-[12.5px] text-white/40">
          <div>© {new Date().getFullYear()} Dialedbase. All rights reserved.</div>
          <div className="flex items-center gap-5">
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

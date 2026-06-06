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
              Websites, apps and AI systems engineered to compound your brand's growth.
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
            <div className="text-[10.5px] text-white/40 tracking-[0.2em] uppercase mb-3">Capabilities</div>
            <ul className="space-y-1.5 text-[13px] text-white/70">
              <li>Websites</li>
              <li>Mobile & Web Apps</li>
              <li>AI Systems</li>
              <li>Brand & Motion</li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <div className="text-[10.5px] text-white/40 tracking-[0.2em] uppercase mb-3">Get in touch</div>
            <a href="#contact" onClick={handleContact} className="inline-flex items-center gap-1.5 text-[13.5px] hover:text-white text-white/85">
              Book a call <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <div className="mt-4 flex items-center gap-2">
              <a href="https://instagram.com/rhysgbp" target="_blank" rel="noreferrer" className="w-9 h-9 grid place-items-center rounded-full glass hover:bg-white/10">
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="relative my-6 select-none overflow-hidden px-2">
          <div className="text-[clamp(2.75rem,7vw,5.75rem)] leading-[0.9] font-semibold tracking-[-0.05em] shine-text whitespace-nowrap text-center">
            Dialedbase
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-5 border-t border-white/5 text-[11.5px] text-white/40">
          <div>© {new Date().getFullYear()} Dialedbase. All rights reserved.</div>
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

import React, { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ASSETS, NAV_LINKS } from "../mock";
import { toast } from "sonner";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleContact = (e) => {
    e.preventDefault();
    toast("Let's build something. Drop us a line at hello@dialedbase.com");
  };

  return (
    <>
      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
        <nav
          className={`glass-strong rounded-full transition-all duration-500 ease-out flex items-center gap-2 sm:gap-4 pl-3 pr-3 py-2 ${
            scrolled ? "shadow-[0_8px_40px_-8px_rgba(0,0,0,0.8)]" : ""
          }`}
          style={{ width: "min(960px, 96vw)" }}
        >
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-white/5 transition-colors">
            <img src={ASSETS.logoBlack} alt="Dialedbase" className="w-7 h-7 rounded-md" />
            <span className="hidden sm:inline text-white font-semibold tracking-tight text-[15px]">Dialedbase</span>
          </a>
          <div className="hidden md:flex items-center gap-1 ml-auto">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-[14px] text-white/70 hover:text-white transition-colors rounded-full"
              >
                {l.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={handleContact}
            className="ml-auto md:ml-2 btn-sheen group inline-flex items-center gap-2 bg-white text-black rounded-full pl-4 pr-1 py-1 text-[14px] font-medium hover:bg-white/90 transition-colors"
          >
            Get In Touch
            <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </a>
          <button
            onClick={() => setOpen((s) => !s)}
            className="md:hidden ml-1 w-9 h-9 grid place-items-center rounded-full bg-white/5 border border-white/10 text-white"
            aria-label="Menu"
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </nav>
      </header>

      {open && (
        <div className="fixed top-20 inset-x-4 z-50 glass-strong rounded-2xl p-4 md:hidden">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-white/80 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;

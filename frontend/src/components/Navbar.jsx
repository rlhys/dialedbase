import React, { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ASSETS, NAV_LINKS } from "../mock";
import { toast } from "sonner";
import { Magnetic } from "./Motion";

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
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
        className="fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-3 sm:px-4"
      >
        <nav
          className={`glass-strong rounded-full transition-all duration-500 ease-out flex items-center gap-1 sm:gap-2 pl-2.5 pr-1.5 py-1.5 ${
            scrolled ? "shadow-[0_8px_40px_-8px_rgba(0,0,0,0.8)]" : ""
          }`}
          style={{ width: "min(720px, 96vw)" }}
        >
          <a href="#home" className="flex items-center gap-2 pl-1 pr-1.5 py-1 rounded-full hover:bg-white/5 transition-colors">
            <motion.img
              src={ASSETS.logoBlack}
              alt="Dialedbase"
              className="w-6 h-6 rounded-md"
              whileHover={{ rotate: -8, scale: 1.06 }}
              transition={{ type: "spring", stiffness: 300, damping: 14 }}
            />
            <span className="hidden sm:inline text-white font-medium tracking-tight text-[13.5px]">Dialedbase</span>
          </a>
          <div className="hidden md:flex items-center gap-0.5 ml-auto">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative px-3 py-1.5 text-[13px] text-white/65 hover:text-white transition-colors rounded-full group"
              >
                {l.label}
                <span className="absolute inset-x-3 -bottom-px h-px bg-white/30 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </a>
            ))}
          </div>
          <Magnetic strength={0.2}>
            <a
              href="#contact"
              onClick={handleContact}
              className="ml-auto md:ml-1.5 btn-sheen group inline-flex items-center gap-1.5 bg-white text-black rounded-full pl-3.5 pr-1 py-1 text-[13px] font-medium hover:bg-white/90 transition-colors"
            >
              Get In Touch
              <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </a>
          </Magnetic>
          <button
            onClick={() => setOpen((s) => !s)}
            className="md:hidden ml-1 w-8 h-8 grid place-items-center rounded-full bg-white/5 border border-white/10 text-white"
            aria-label="Menu"
          >
            {open ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 inset-x-3 z-50 glass-strong rounded-2xl p-3 md:hidden"
          >
            {NAV_LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.06 }}
                className="block px-3 py-2 text-[14px] text-white/80 hover:text-white"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

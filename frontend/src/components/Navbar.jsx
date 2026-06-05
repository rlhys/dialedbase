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

  // lock scroll when mobile menu open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleContact = (e) => {
    e.preventDefault();
    setOpen(false);
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
          className={`glass-strong rounded-full transition-all duration-500 ease-out flex items-center gap-1 sm:gap-2 pl-2 pr-1.5 py-1.5 w-full sm:w-auto ${
            scrolled ? "shadow-[0_8px_40px_-8px_rgba(0,0,0,0.8)]" : ""
          }`}
          style={{ maxWidth: "min(720px, 96vw)" }}
        >
          {/* Logo + brand (always visible) */}
          <a href="#home" className="flex items-center gap-2 pl-1 pr-2 py-0.5 rounded-full hover:bg-white/5 transition-colors shrink-0">
            <motion.img
              src={ASSETS.logoBlack}
              alt="Dialedbase"
              className="w-6 h-6 rounded-md"
              whileHover={{ rotate: -8, scale: 1.06 }}
              transition={{ type: "spring", stiffness: 300, damping: 14 }}
            />
            <span className="text-white font-medium tracking-tight text-[13.5px]">Dialedbase</span>
          </a>

          {/* Desktop links */}
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

          {/* CTA — desktop only inline */}
          <div className="hidden sm:block ml-auto md:ml-1.5">
            <Magnetic strength={0.2}>
              <a
                href="#contact"
                onClick={handleContact}
                className="btn-sheen group inline-flex items-center gap-1.5 bg-white text-black rounded-full pl-3.5 pr-1 py-1 text-[13px] font-medium hover:bg-white/90 transition-colors"
              >
                Get In Touch
                <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </a>
            </Magnetic>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen((s) => !s)}
            className="sm:hidden ml-auto w-9 h-9 grid place-items-center rounded-full bg-white text-black"
            aria-label="Menu"
          >
            <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.25 }}>
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </motion.div>
          </button>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm sm:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
              className="fixed top-[68px] inset-x-3 z-50 glass-strong rounded-2xl p-2 sm:hidden"
            >
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className="block px-4 py-3 text-[15px] text-white/85 hover:text-white hover:bg-white/5 rounded-xl"
                >
                  {l.label}
                </motion.a>
              ))}
              <div className="p-2 pt-3">
                <a
                  href="#contact"
                  onClick={handleContact}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-white text-black rounded-full px-4 py-2.5 text-[14px] font-medium"
                >
                  Get In Touch
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

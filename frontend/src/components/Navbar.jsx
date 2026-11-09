import React, { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ASSETS, NAV_LINKS } from "../mock";
import { Magnetic } from "./Motion";
import { useContact } from "./ContactFlow";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { open: openContact } = useContact();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // close drawer on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  const handleContact = (e) => {
    e.preventDefault();
    setOpen(false);
    openContact();
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
          <Link to="/" className="flex items-center gap-2 pl-1 pr-2 py-0.5 rounded-full hover:bg-white/5 transition-colors shrink-0">
            <motion.img
              src={ASSETS.logoBlack}
              alt="Dialedbase"
              className="w-6 h-6 rounded-md"
              whileHover={{ rotate: -8, scale: 1.06 }}
              transition={{ type: "spring", stiffness: 300, damping: 14 }}
            />
            <span className="text-white font-medium tracking-tight text-[13.5px]">Dialedbase</span>
          </Link>

          <div className="hidden md:flex items-center gap-0.5 ml-auto">
            {NAV_LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  to={l.href}
                  className={`relative px-3 py-1.5 text-[13px] transition-colors rounded-full group ${active ? "text-white" : "text-white/60 hover:text-white"}`}
                >
                  {l.label}
                  <span className={`absolute inset-x-3 -bottom-px h-px bg-white/40 origin-left transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </Link>
              );
            })}
          </div>

          <div className="hidden sm:block ml-auto md:ml-1.5">
            <Magnetic strength={0.2}>
              <a
                href="#contact"
                onClick={handleContact}
                className="btn-sheen group inline-flex items-center gap-1.5 bg-white text-black rounded-full pl-3.5 pr-1 py-1 text-[13px] font-medium hover:bg-white/90 transition-colors"
              >
                Book a call
                <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </a>
            </Magnetic>
          </div>

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
              {NAV_LINKS.map((l, i) => {
                const active = pathname === l.href;
                return (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <Link
                      to={l.href}
                      onClick={() => setOpen(false)}
                      className={`block px-4 py-3 text-[15px] rounded-xl ${active ? "text-white bg-white/5" : "text-white/85 hover:text-white hover:bg-white/5"}`}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="p-2 pt-3">
                <a
                  href="#contact"
                  onClick={handleContact}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-white text-black rounded-full px-4 py-2.5 text-[14px] font-medium"
                >
                  Book a call
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

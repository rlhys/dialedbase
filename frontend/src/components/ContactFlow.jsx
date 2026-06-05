import React, { createContext, useContext, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, X } from "lucide-react";
import { InlineWidget } from "react-calendly";
import { ASSETS } from "../mock";

// ---------------- Context ----------------
const ContactCtx = createContext({ open: () => {}, close: () => {} });
export const useContact = () => useContext(ContactCtx);

// ---------------- Steps configuration ----------------
const STEPS = [
  {
    id: "service",
    title: "What do you need built?",
    subtitle: "Pick the closest match — we'll calibrate on the call.",
    type: "single",
    options: [
      { v: "Website", desc: "Marketing site, brand experience, motion-driven landing" },
      { v: "Web / Mobile App", desc: "Full-stack product, dashboard, SaaS, iOS / Android" },
      { v: "AI System", desc: "Custom agents, automations, RAG, copilots" },
      { v: "Brand & Motion", desc: "Identity, 3D, motion, design system" },
      { v: "Not sure yet", desc: "Let's scope it together" },
    ],
  },
  {
    id: "budget",
    title: "What's your budget?",
    subtitle: "Helps us shape the right scope from day one.",
    type: "single",
    options: [
      { v: "Under £5k" },
      { v: "£5k – £15k" },
      { v: "£15k – £40k" },
      { v: "£40k – £100k" },
      { v: "£100k+" },
    ],
  },
  {
    id: "timeline",
    title: "When do you want to launch?",
    subtitle: "We're booking July · August projects.",
    type: "single",
    options: [
      { v: "ASAP (this month)" },
      { v: "1 – 2 months" },
      { v: "3 – 6 months" },
      { v: "Flexible / exploring" },
    ],
  },
  {
    id: "about",
    title: "Tell us about your project",
    subtitle: "A few sentences is perfect.",
    type: "text",
  },
  {
    id: "contact",
    title: "Where can we reach you?",
    subtitle: "We'll only use this to send the meeting confirmation.",
    type: "form",
  },
];

// ---------------- Provider ----------------
export const ContactProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const value = useMemo(
    () => ({ open: () => setIsOpen(true), close: () => setIsOpen(false) }),
    []
  );
  return (
    <ContactCtx.Provider value={value}>
      {children}
      <AnimatePresence>{isOpen && <ContactModal onClose={() => setIsOpen(false)} />}</AnimatePresence>
    </ContactCtx.Provider>
  );
};

// ---------------- Modal ----------------
const ContactModal = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showCalendly, setShowCalendly] = useState(false);

  // lock body scroll
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const current = STEPS[step];
  const total = STEPS.length;
  const progress = ((step + 1) / total) * 100;

  const setAnswer = (id, v) => setAnswers((s) => ({ ...s, [id]: v }));

  const canNext = (() => {
    if (current.type === "single") return !!answers[current.id];
    if (current.type === "text") return (answers[current.id] || "").trim().length > 4;
    if (current.type === "form") {
      const f = answers.contact || {};
      return f.name?.trim() && /\S+@\S+\.\S+/.test(f.email || "");
    }
    return true;
  })();

  const next = () => {
    if (!canNext) return;
    if (step < total - 1) setStep(step + 1);
    else setShowCalendly(true);
  };
  const prev = () => setStep((s) => Math.max(0, s - 1));

  // Build Calendly prefill from answers
  const calendlyPrefill = {
    name: answers.contact?.name || "",
    email: answers.contact?.email || "",
    customAnswers: {
      a1: answers.service || "",
      a2: answers.budget || "",
      a3: answers.timeline || "",
      a4: answers.about || "",
      a5: answers.contact?.company || "",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
        className="relative w-full max-w-3xl glass-strong rounded-3xl overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full glass grid place-items-center hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {!showCalendly ? (
          <>
            {/* Header */}
            <div className="px-6 sm:px-8 pt-6 sm:pt-8">
              <div className="flex items-center gap-2.5 mb-5">
                <img src={ASSETS.logoBlack} className="w-7 h-7 rounded-md" alt="" />
                <div>
                  <div className="text-[14px] font-medium tracking-tight">Start a project</div>
                  <div className="text-[11.5px] text-white/45">Step {step + 1} of {total} — about 60 seconds</div>
                </div>
              </div>
              {/* Progress */}
              <div className="h-1 w-full rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  className="h-full bg-white"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 200, damping: 30 }}
                />
              </div>
            </div>

            {/* Steps */}
            <div className="px-6 sm:px-8 py-7 sm:py-8 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-semibold tracking-[-0.02em] text-[24px] sm:text-[30px] leading-[1.15]">
                    <span className="shine-text">{current.title}</span>
                  </h3>
                  {current.subtitle && (
                    <p className="mt-2 text-white/55 text-[13.5px] sm:text-[14.5px]">{current.subtitle}</p>
                  )}

                  <div className="mt-6">
                    {current.type === "single" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {current.options.map((o) => {
                          const selected = answers[current.id] === o.v;
                          return (
                            <button
                              key={o.v}
                              onClick={() => setAnswer(current.id, o.v)}
                              className={`text-left rounded-2xl border p-4 transition-all duration-200 ${
                                selected
                                  ? "bg-white text-black border-white"
                                  : "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.14]"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div className="font-medium text-[14.5px]">{o.v}</div>
                                <div className={`w-5 h-5 rounded-full grid place-items-center ${selected ? "bg-black text-white" : "border border-white/20"}`}>
                                  {selected && <Check className="w-3 h-3" />}
                                </div>
                              </div>
                              {o.desc && (
                                <div className={`mt-1 text-[12.5px] ${selected ? "text-black/65" : "text-white/45"}`}>
                                  {o.desc}
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {current.type === "text" && (
                      <textarea
                        value={answers[current.id] || ""}
                        onChange={(e) => setAnswer(current.id, e.target.value)}
                        placeholder="e.g. We're a luxury hotel brand launching a new property and need a website + booking app that feels as premium as our hospitality."
                        rows={6}
                        className="w-full rounded-2xl bg-white/[0.04] border border-white/[0.1] focus:border-white/30 focus:bg-white/[0.06] outline-none px-4 py-3.5 text-[14.5px] leading-relaxed resize-none transition-colors"
                      />
                    )}

                    {current.type === "form" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Field label="Full name *" value={answers.contact?.name || ""} onChange={(v) => setAnswer("contact", { ...(answers.contact || {}), name: v })} placeholder="Rhys Evans" />
                        <Field label="Email *" type="email" value={answers.contact?.email || ""} onChange={(v) => setAnswer("contact", { ...(answers.contact || {}), email: v })} placeholder="you@company.com" />
                        <Field label="Company" value={answers.contact?.company || ""} onChange={(v) => setAnswer("contact", { ...(answers.contact || {}), company: v })} placeholder="Optional" />
                        <Field label="Website" value={answers.contact?.website || ""} onChange={(v) => setAnswer("contact", { ...(answers.contact || {}), website: v })} placeholder="Optional" />
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer / Nav */}
            <div className="mt-auto border-t border-white/[0.06] px-6 sm:px-8 py-4 flex items-center justify-between gap-3">
              <button
                onClick={prev}
                disabled={step === 0}
                className={`inline-flex items-center gap-1.5 text-[13px] px-3 py-2 rounded-full transition-opacity ${step === 0 ? "opacity-30 cursor-not-allowed" : "text-white/75 hover:text-white hover:bg-white/5"}`}
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <div className="hidden sm:flex items-center gap-1.5">
                {STEPS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 rounded-full transition-all ${i === step ? "w-6 bg-white" : i < step ? "w-3 bg-white/40" : "w-3 bg-white/15"}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                disabled={!canNext}
                className={`btn-sheen group inline-flex items-center gap-2 rounded-full pl-4 pr-1 py-1 text-[13.5px] font-medium transition-opacity ${canNext ? "bg-white text-black" : "bg-white/15 text-white/40 cursor-not-allowed"}`}
              >
                {step === total - 1 ? "Schedule call" : "Next"}
                <span className={`w-7 h-7 rounded-full grid place-items-center ${canNext ? "bg-black text-white group-hover:rotate-45 transition-transform duration-300" : "bg-black/40 text-white/60"}`}>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>
          </>
        ) : (
          <CalendlyStep answers={answers} prefill={calendlyPrefill} onBack={() => setShowCalendly(false)} />
        )}
      </motion.div>
    </motion.div>
  );
};

const Field = ({ label, value, onChange, placeholder, type = "text" }) => (
  <label className="block">
    <div className="text-[11.5px] text-white/55 tracking-[0.05em] mb-1.5">{label}</div>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl bg-white/[0.04] border border-white/[0.1] focus:border-white/30 focus:bg-white/[0.06] outline-none px-3.5 py-2.5 text-[14px] transition-colors"
    />
  </label>
);

// ---------------- Calendly step ----------------
const CalendlyStep = ({ answers, prefill, onBack }) => (
  <div className="flex flex-col h-full">
    <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <img src={ASSETS.logoBlack} className="w-7 h-7 rounded-md" alt="" />
        <div>
          <div className="text-[14px] font-medium tracking-tight">Pick a time with Rhys</div>
          <div className="text-[11.5px] text-white/45 truncate max-w-[60vw] sm:max-w-none">
            {[answers.service, answers.budget, answers.timeline].filter(Boolean).join(" · ")}
          </div>
        </div>
      </div>
      <button onClick={onBack} className="text-[12.5px] text-white/65 hover:text-white inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass hover:bg-white/10 transition-colors">
        <ArrowLeft className="w-3 h-3" /> Edit answers
      </button>
    </div>

    {/* Calendly inline widget */}
    <div className="flex-1 min-h-[560px] sm:min-h-[640px] bg-white">
      <InlineWidget
        url="https://calendly.com/rhysgbp"
        prefill={prefill}
        pageSettings={{
          backgroundColor: "ffffff",
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: "0a0a0a",
          textColor: "111111",
        }}
        styles={{ height: "100%", width: "100%" }}
      />
    </div>
  </div>
);

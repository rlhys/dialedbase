import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, ShieldCheck, Lock } from "lucide-react";
import { API_BASE } from "@/lib/api";
import { formatMoney } from "@/lib/format";

const SQUARE_JS = {
  production: "https://web.squarecdn.com/v1/square.js",
  sandbox: "https://sandbox.web.squarecdn.com/v1/square.js",
};

function loadSquareJs(src) {
  return new Promise((resolve, reject) => {
    if (window.Square) return resolve(window.Square);
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(window.Square));
      existing.addEventListener("error", reject);
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve(window.Square);
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

export default function SaveCard() {
  const { token } = useParams();
  const [phase, setPhase] = useState("loading"); // loading | ready | submitting | done | error | active
  const [session, setSession] = useState(null);
  const [error, setError] = useState("");
  const [cardReady, setCardReady] = useState(false);
  const cardRef = useRef(null);
  const containerRef = useRef(null);

  // 1) Load session info first.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/pay/card-session/${token}`);
        if (!res.ok) {
          const d = await res.json().catch(() => ({}));
          throw new Error(d.detail || "This link is invalid or has expired.");
        }
        const data = await res.json();
        if (cancelled) return;
        setSession(data);
        setPhase(data.already_active ? "active" : "ready");
      } catch (e) {
        if (!cancelled) {
          setError(e.message || "Something went wrong.");
          setPhase("error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  // 2) Once the form (and its container) is rendered, mount the Square card field.
  useEffect(() => {
    if (phase !== "ready" || !session || cardRef.current || !containerRef.current) return;
    let cancelled = false;
    (async () => {
      try {
        const Square = await loadSquareJs(SQUARE_JS[session.environment] || SQUARE_JS.production);
        if (cancelled || !containerRef.current) return;
        const payments = Square.payments(session.application_id, session.location_id);
        const card = await payments.card();
        await card.attach(containerRef.current);
        if (cancelled) return;
        cardRef.current = card;
        setCardReady(true);
      } catch (e) {
        if (!cancelled) {
          setError(e.message || "Couldn't load the secure card field.");
          setPhase("error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [phase, session]);

  const submit = async () => {
    if (!cardRef.current) return;
    setPhase("submitting");
    setError("");
    try {
      const result = await cardRef.current.tokenize();
      if (result.status !== "OK") {
        throw new Error(result.errors?.[0]?.message || "Please check your card details.");
      }
      const res = await fetch(`${API_BASE}/pay/save-card/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source_id: result.token }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.detail || "We couldn't save your card.");
      }
      setPhase("done");
    } catch (e) {
      setError(e.message || "Something went wrong.");
      setPhase("ready");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 text-white">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-white/5 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
        className="glass-strong relative w-full max-w-md rounded-3xl p-8"
      >
        {phase === "loading" && (
          <div className="flex flex-col items-center py-10 text-white/60">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p className="mt-3 text-sm">Loading secure form…</p>
          </div>
        )}

        {phase === "error" && (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-300">
              <Lock className="h-5 w-5" />
            </div>
            <h1 className="text-lg font-semibold">Link unavailable</h1>
            <p className="mt-2 text-sm text-white/50">{error}</p>
            <p className="mt-4 text-xs text-white/35">Please ask {session?.business_name || "us"} for a new link.</p>
          </div>
        )}

        {phase === "active" && (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-emerald-400" />
            <h1 className="text-lg font-semibold">You're all set</h1>
            <p className="mt-2 text-sm text-white/50">Your subscription is already active. No action needed.</p>
          </div>
        )}

        {phase === "done" && (
          <div className="py-6 text-center">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }}>
              <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-emerald-400" />
            </motion.div>
            <h1 className="text-xl font-semibold">Card saved</h1>
            <p className="mt-2 text-sm text-white/55">
              Thank you{session?.client_name ? `, ${session.client_name.split(" ")[0]}` : ""}. Your
              {session?.monthly_amount ? ` ${formatMoney(session.monthly_amount, session.currency)}/month` : " monthly"} plan
              is now set up and will renew automatically.
            </p>
            <p className="mt-5 text-xs text-white/35">You can close this page.</p>
          </div>
        )}

        {(phase === "ready" || phase === "submitting") && (
          <>
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h1 className="text-xl font-semibold tracking-tight">{session?.business_name || "dialedbase"}</h1>
              <p className="mt-1 text-sm text-white/50">
                {session?.monthly_amount
                  ? `Set up your ${formatMoney(session.monthly_amount, session.currency)}/month plan`
                  : "Securely save your card"}
              </p>
            </div>

            <div className="relative">
              <div ref={containerRef} className="min-h-[60px] rounded-xl border border-white/10 bg-white/5 p-3" />
              {!cardReady && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-white/40">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}
            </div>

            {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}

            <button
              onClick={submit}
              disabled={phase === "submitting" || !cardReady}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {phase === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
              {phase === "submitting" ? "Saving…" : "Save card & start plan"}
            </button>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-white/35">
              <Lock className="h-3 w-3" /> Securely processed by Square. Your card is never stored on our servers.
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}

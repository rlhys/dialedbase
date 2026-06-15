import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, Lock } from "lucide-react";
import { API_BASE } from "@/lib/api";
import { formatMoney } from "@/lib/format";
import Logo from "@/components/Logo";

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

export default function Checkout() {
  const { token } = useParams();
  const [phase, setPhase] = useState("loading"); // loading | ready | paying | done | error | paid
  const [session, setSession] = useState(null);
  const [error, setError] = useState("");
  const [formReady, setFormReady] = useState(false);
  const [wallets, setWallets] = useState({ apple: false, google: false, clearpay: false });

  const payments = useRef(null);
  const card = useRef(null);
  const applePay = useRef(null);
  const cardBox = useRef(null);

  const amountStr = session ? (session.amount / 100).toFixed(2) : "0.00";

  // 1) Load session.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/pay/checkout-session/${token}`);
        if (!res.ok) {
          const d = await res.json().catch(() => ({}));
          throw new Error(d.detail || "This payment link is invalid or has expired.");
        }
        const data = await res.json();
        if (cancelled) return;
        setSession(data);
        setPhase(data.status === "paid" ? "paid" : "ready");
      } catch (e) {
        if (!cancelled) { setError(e.message); setPhase("error"); }
      }
    })();
    return () => { cancelled = true; };
  }, [token]);

  // 2) Initialize payment methods once the form is rendered.
  useEffect(() => {
    if (phase !== "ready" || !session || payments.current || !cardBox.current) return;
    let cancelled = false;
    (async () => {
      try {
        const Square = await loadSquareJs(SQUARE_JS[session.environment] || SQUARE_JS.production);
        if (cancelled) return;
        const pmts = Square.payments(session.application_id, session.location_id);
        payments.current = pmts;

        const paymentRequest = () =>
          pmts.paymentRequest({
            countryCode: session.country || "GB",
            currencyCode: session.currency || "GBP",
            total: { amount: amountStr, label: session.business_name || "Total" },
          });

        // Initialize every method concurrently so nothing pops in late.
        const initCard = (async () => {
          const c = await pmts.card();
          await c.attach(cardBox.current);
          card.current = c;
        })();

        const initGoogle = (async () => {
          try {
            const gp = await pmts.googlePay(paymentRequest());
            await gp.attach("#gpay-btn", { buttonColor: "white", buttonType: "pay", buttonSizeMode: "fill" });
            document.getElementById("gpay-btn")?.addEventListener("click", () => onTokenize(gp, false));
            if (!cancelled) setWallets((w) => ({ ...w, google: true }));
          } catch { /* not available */ }
        })();

        const initApple = (async () => {
          try {
            const ap = await pmts.applePay(paymentRequest());
            applePay.current = ap;
            if (!cancelled) setWallets((w) => ({ ...w, apple: true }));
          } catch { /* not available */ }
        })();

        const initClearpay = (async () => {
          try {
            const cp = await pmts.afterpayClearpay(paymentRequest());
            await cp.attach("#clearpay-btn");
            document.getElementById("clearpay-btn")?.addEventListener("click", () => onTokenize(cp, false));
            if (!cancelled) setWallets((w) => ({ ...w, clearpay: true }));
          } catch { /* not available / ineligible amount */ }
        })();

        await Promise.allSettled([initCard, initGoogle, initApple, initClearpay]);
        if (!cancelled) setFormReady(true);
      } catch (e) {
        if (!cancelled) { setError(e.message || "Couldn't load the secure payment form."); setPhase("error"); }
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, session]);

  const postPayment = async (sourceId, verificationToken) => {
    const res = await fetch(`${API_BASE}/pay/checkout/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source_id: sourceId, verification_token: verificationToken }),
    });
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      throw new Error(d.detail || "Payment could not be completed.");
    }
    return res.json();
  };

  const onTokenize = async (method, verify) => {
    setError("");
    setPhase("paying");
    try {
      const result = await method.tokenize();
      if (result.status !== "OK") {
        throw new Error(result.errors?.[0]?.message || "Please check your details.");
      }
      let verificationToken;
      if (verify && payments.current) {
        try {
          const v = await payments.current.verifyBuyer(result.token, {
            amount: amountStr,
            currencyCode: session.currency || "GBP",
            intent: "CHARGE",
            billingContact: {},
          });
          verificationToken = v?.token;
        } catch { /* proceed without SCA token */ }
      }
      await postPayment(result.token, verificationToken);
      setPhase("done");
    } catch (e) {
      setError(e.message || "Something went wrong.");
      setPhase("ready");
    }
  };

  const payByCard = () => card.current && onTokenize(card.current, true);
  const payByApple = () => applePay.current && onTokenize(applePay.current, false);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 text-white">
      <style>{`
        .apple-pay-button {
          display: block; width: 100%; height: 44px; border-radius: 12px; cursor: pointer;
          -webkit-appearance: -apple-pay-button; appearance: -apple-pay-button;
          -apple-pay-button-type: plain; -apple-pay-button-style: white;
        }
      `}</style>
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
            <p className="mt-3 text-sm">Loading secure checkout…</p>
          </div>
        )}

        {phase === "error" && (
          <div className="py-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/15 text-rose-300">
              <Lock className="h-5 w-5" />
            </div>
            <h1 className="text-lg font-semibold">Link unavailable</h1>
            <p className="mt-2 text-sm text-white/50">{error}</p>
          </div>
        )}

        {(phase === "paid" || phase === "done") && (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-emerald-400" />
            <h1 className="text-xl font-semibold">{phase === "paid" ? "Already paid" : "Payment complete"}</h1>
            <p className="mt-2 text-sm text-white/55">
              {phase === "paid"
                ? "This payment has already been settled. Nothing more to do."
                : `Thank you${session?.client_name ? `, ${session.client_name.split(" ")[0]}` : ""} — your payment of ${formatMoney(session?.amount, session?.currency)} was received.`}
            </p>
            <p className="mt-5 text-xs text-white/35">You can close this page.</p>
          </div>
        )}

        {(phase === "ready" || phase === "paying") && (
          <>
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex justify-center"><Logo size="h-14 w-14" /></div>
              <h1 className="text-xl font-semibold tracking-tight">{session?.business_name || "dialedbase"}</h1>
              <p className="mt-1 text-sm text-white/70 capitalize">
                {session?.type ? `${session.type} payment` : "Payment"}
              </p>
              <div className="mt-3 text-3xl font-semibold tracking-tight">
                {formatMoney(session?.amount, session?.currency)}
              </div>
            </div>

            {/* Payment methods — all mounted up front, revealed together once ready */}
            <div className="relative min-h-[150px]">
              {!formReady && (
                <div className="absolute inset-0 flex items-center justify-center text-white/50">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              )}
              <div className={formReady ? "opacity-100 transition-opacity duration-300" : "opacity-0"}>
                {/* Apple Pay (official button) */}
                {wallets.apple && (
                  <button onClick={payByApple} aria-label="Pay with Apple Pay" className="apple-pay-button mb-2" />
                )}
                {/* Google Pay (Square renders the official button into this node) */}
                <div id="gpay-btn" className={wallets.google ? "mb-2 h-11 w-full overflow-hidden rounded-xl" : ""} />

                {(wallets.apple || wallets.google) && (
                  <div className="mb-3 flex items-center gap-3 text-[11px] text-white/45">
                    <div className="h-px flex-1 bg-white/10" /> or pay by card <div className="h-px flex-1 bg-white/10" />
                  </div>
                )}

                <div ref={cardBox} className="min-h-[60px] rounded-xl border border-white/10 bg-white/5 p-3" />

                {error && <p className="mt-3 text-sm text-rose-300">{error}</p>}

                <button
                  onClick={payByCard}
                  disabled={phase === "paying" || !formReady}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {phase === "paying" && <Loader2 className="h-4 w-4 animate-spin" />}
                  {phase === "paying" ? "Processing…" : `Pay ${formatMoney(session?.amount, session?.currency)}`}
                </button>

                {/* Clearpay / Afterpay (Square renders the official button here) */}
                <div id="clearpay-btn" className={wallets.clearpay ? "mt-3" : ""} />
              </div>
            </div>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-white/55">
              <Lock className="h-3 w-3" /> Secure payment processed by Square.
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}

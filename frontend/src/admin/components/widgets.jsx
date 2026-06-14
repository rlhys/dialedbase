import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function PageHeader({ title, subtitle, children }) {
  return (
    <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-white/45">{subtitle}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}

export function StatCard({ label, value, sub, icon: Icon, accent = "white", index = 0 }) {
  const accents = {
    white: "from-white/10",
    green: "from-emerald-500/20",
    amber: "from-amber-500/20",
    red: "from-rose-500/20",
    blue: "from-sky-500/20",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 0.61, 0.36, 1] }}
      className="glass glass-hover relative overflow-hidden rounded-2xl p-5"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br to-transparent blur-2xl",
          accents[accent]
        )}
      />
      <div className="relative flex items-start justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-white/45">{label}</span>
        {Icon && <Icon className="h-4 w-4 text-white/40" />}
      </div>
      <div className="relative mt-3 text-2xl font-semibold tracking-tight md:text-3xl">{value}</div>
      {sub && <div className="relative mt-1 text-xs text-white/40">{sub}</div>}
    </motion.div>
  );
}

export function ChartCard({ title, action, children, className }) {
  return (
    <div className={cn("glass rounded-2xl p-5", className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white/80">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

const STATUS_STYLES = {
  paid: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  pending: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  overdue: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  failed: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  refunded: "bg-white/10 text-white/60 border-white/20",
  active: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  lead: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  paused: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  churned: "bg-white/10 text-white/50 border-white/20",
};

export function StatusBadge({ status }) {
  const key = (status || "").toLowerCase();
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        STATUS_STYLES[key] || "bg-white/10 text-white/60 border-white/20"
      )}
    >
      {status}
    </span>
  );
}

export function EmptyState({ icon: Icon, title, hint }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-16 text-center">
      {Icon && <Icon className="mb-3 h-8 w-8 text-white/30" />}
      <p className="text-sm font-medium text-white/70">{title}</p>
      {hint && <p className="mt-1 text-xs text-white/40">{hint}</p>}
    </div>
  );
}

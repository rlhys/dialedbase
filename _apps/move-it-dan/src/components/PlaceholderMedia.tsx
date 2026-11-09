type PlaceholderMediaProps = {
  label: string;
  hint?: string;
  className?: string;
  tone?: "ink" | "mist" | "signal";
};

const tones = {
  ink: "from-[#132033] via-[#1c2d42] to-[#0c1624]",
  mist: "from-[#cfd8e2] via-[#e7ecf1] to-[#b8c5d2]",
  signal: "from-[#2a3340] via-[#1a2433] to-[#3d2e0a]",
};

export function PlaceholderMedia({
  label,
  hint,
  className = "",
  tone = "ink",
}: PlaceholderMediaProps) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      role="img"
      aria-label={label}
    >
      <div
        className={`absolute inset-0 bg-linear-to-br ${tones[tone]}`}
        aria-hidden
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-18deg, transparent 0 14px, rgba(255,255,255,0.045) 14px 15px)",
        }}
        aria-hidden
      />
      <div
        className="absolute -right-8 -bottom-10 h-48 w-48 rounded-full bg-[color-mix(in_srgb,var(--signal)_28%,transparent)] blur-3xl"
        aria-hidden
      />
      <div className="relative z-10 flex h-full min-h-[16rem] flex-col justify-end gap-2 p-5 text-left sm:p-7">
        <p className="condensed text-[0.68rem] text-signal">Placeholder</p>
        <p className="display max-w-md text-xl leading-tight text-chalk sm:text-2xl">
          {label}
        </p>
        {hint ? (
          <p className="max-w-sm text-sm leading-relaxed text-white/70">
            {hint}
          </p>
        ) : null}
      </div>
    </div>
  );
}

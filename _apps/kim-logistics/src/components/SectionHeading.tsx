import { cx } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  support?: string;
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  support,
  tone = "light",
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={cx("max-w-2xl", className)}>
      {eyebrow ? (
        <p
          className={cx(
            "text-sm font-semibold uppercase tracking-[0.18em]",
            dark ? "text-signal" : "text-signal",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cx(
          "font-display mt-3 text-balance text-3xl leading-[1.05] tracking-[-0.03em] sm:text-4xl",
          dark ? "text-paper" : "text-ink",
        )}
      >
        {title}
      </h2>
      {support ? (
        <p className={cx("mt-4 text-lg leading-relaxed", dark ? "text-paper/72" : "text-mute")}>
          {support}
        </p>
      ) : null}
    </div>
  );
}

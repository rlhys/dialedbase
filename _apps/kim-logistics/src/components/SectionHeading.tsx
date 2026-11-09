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
            "text-xs font-semibold uppercase tracking-[0.22em]",
            dark ? "text-signal" : "text-moss",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cx(
          "font-display mt-3 text-balance text-3xl leading-tight tracking-tight sm:text-4xl md:text-[2.75rem]",
          dark ? "text-paper" : "text-ink",
        )}
      >
        {title}
      </h2>
      {support ? (
        <p className={cx("mt-4 text-lg leading-relaxed", dark ? "text-paper/75" : "text-steel")}>
          {support}
        </p>
      ) : null}
    </div>
  );
}

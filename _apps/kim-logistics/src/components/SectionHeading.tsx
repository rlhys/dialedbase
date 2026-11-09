import { MotionHashes } from "@/components/MotionHashes";
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
        <div className="flex items-center gap-3">
          <p
            className={cx(
              "text-[0.7rem] font-semibold uppercase tracking-[0.28em]",
              dark ? "text-signal" : "text-mute",
            )}
          >
            {eyebrow}
          </p>
          <MotionHashes tone={dark ? "signal" : "ink"} />
        </div>
      ) : null}
      <h2
        className={cx(
          "font-display mt-4 text-balance text-3xl leading-[1.05] tracking-[-0.03em] sm:text-4xl md:text-[2.75rem]",
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

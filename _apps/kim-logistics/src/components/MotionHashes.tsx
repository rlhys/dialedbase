import { cx } from "@/lib/utils";

type MotionHashesProps = {
  className?: string;
  tone?: "ink" | "chalk" | "signal";
};

/** Logo-derived diagonal slash motif for section rules. */
export function MotionHashes({ className, tone = "signal" }: MotionHashesProps) {
  const color =
    tone === "ink" ? "text-ink" : tone === "chalk" ? "text-paper" : "text-signal";

  return (
    <span aria-hidden className={cx("slash-rail", color, className)}>
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

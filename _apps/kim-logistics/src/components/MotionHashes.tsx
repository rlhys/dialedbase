import { cx } from "@/lib/utils";

type MotionHashesProps = {
  className?: string;
  tone?: "ink" | "chalk" | "signal";
};

/** Logo-derived motion-hash motif for section rules. */
export function MotionHashes({ className, tone = "signal" }: MotionHashesProps) {
  const color =
    tone === "ink" ? "bg-ink" : tone === "chalk" ? "bg-paper" : "bg-signal";

  return (
    <span aria-hidden className={cx("inline-flex items-end gap-[3px]", className)}>
      <span className={cx("h-3 w-[2px] -skew-x-[28deg]", color)} />
      <span className={cx("h-4 w-[2px] -skew-x-[28deg]", color)} />
      <span className={cx("h-5 w-[2px] -skew-x-[28deg]", color)} />
      <span className={cx("h-6 w-[2px] -skew-x-[28deg]", color)} />
    </span>
  );
}

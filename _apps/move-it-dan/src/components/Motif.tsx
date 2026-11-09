import Image from "next/image";

type MotifProps = {
  tone?: "ink" | "chalk";
  size?: number;
  className?: string;
};

/** Sparse house/arrow O mark. Use rarely as accent, never as a replacement logo. */
export function Motif({ tone = "ink", size = 18, className = "" }: MotifProps) {
  const src = tone === "chalk" ? "/mark-on-dark.png" : "/mark.png";
  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      aria-hidden
      className={`inline-block shrink-0 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

type BrandLogoProps = {
  /** ink = black+blue for light surfaces; chalk = white+blue for dark surfaces */
  tone?: "ink" | "chalk";
  className?: string;
  /** Visual height in px (width scales from intrinsic ratio). */
  height?: number;
  priority?: boolean;
  href?: string | null;
  onClick?: () => void;
};

const INTRINSIC = { width: 1387, height: 216 };

export function BrandLogo({
  tone = "ink",
  className = "",
  height = 36,
  priority = false,
  href = "/",
  onClick,
}: BrandLogoProps) {
  const width = Math.round((height * INTRINSIC.width) / INTRINSIC.height);
  const src = tone === "chalk" ? "/logo-on-dark.png" : "/logo.png";

  const image = (
    <Image
      src={src}
      alt={site.name}
      width={width}
      height={height}
      priority={priority}
      className="h-full w-auto"
    />
  );

  const classes = `inline-flex items-center ${className}`.trim();
  const style = className.includes("hero-logo")
    ? undefined
    : ({ height } as const);

  if (href === null) {
    return (
      <span className={classes} style={style}>
        {image}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`no-underline ${classes}`}
      aria-label={site.name}
      onClick={onClick}
      style={style}
    >
      {image}
    </Link>
  );
}

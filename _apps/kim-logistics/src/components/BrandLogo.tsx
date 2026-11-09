import Image from "next/image";
import { brand } from "@/content/site";
import { cx } from "@/lib/utils";

type BrandLogoProps = {
  /** chalk = white marks for dark surfaces; ink = near-black for light surfaces */
  variant: "chalk" | "ink";
  className?: string;
  priority?: boolean;
  sizes?: string;
};

const SRC = {
  chalk: "/images/logo-wordmark-chalk.png",
  ink: "/images/logo-wordmark-ink.png",
} as const;

/**
 * Sacred wordmark. Never CSS-filter invert this asset.
 * House + motion hashes live inside the PNG; keep alpha intact.
 */
export function BrandLogo({
  variant,
  className,
  priority = false,
  sizes = "240px",
}: BrandLogoProps) {
  return (
    <span className={cx("relative inline-block", className)}>
      <Image
        src={SRC[variant]}
        alt={brand.name}
        fill
        className="object-contain object-left"
        sizes={sizes}
        priority={priority}
      />
    </span>
  );
}

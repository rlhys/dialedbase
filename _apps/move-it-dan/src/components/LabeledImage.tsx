import Image from "next/image";

type LabeledImageProps = {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

export function LabeledImage({
  src,
  alt,
  label,
  className = "",
  imageClassName = "object-cover",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: LabeledImageProps) {
  return (
    <figure className={`relative overflow-hidden bg-black ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={imageClassName}
        sizes={sizes}
      />
      {label ? (
        <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/40 to-transparent p-4 pt-16 text-left">
          <span className="mt-1 block text-sm text-white/80">{label}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}

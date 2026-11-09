import Image from "next/image";

const HREF = "https://dialedbase.com";

export function DialedbaseCredit() {
  return (
    <a
      href={HREF}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-2.5 text-white/55 no-underline transition-colors hover:text-white"
      aria-label="Built by Dialedbase - opens dialedbase.com"
    >
      <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-sm border border-white/10 transition-colors group-hover:border-white/25">
        <Image
          src="/vendor/dialedbase-mark.png"
          alt="Dialedbase"
          fill
          className="object-cover"
          sizes="32px"
        />
      </span>
      <span className="text-xs tracking-tight">
        Built by{" "}
        <span className="font-semibold underline-offset-4 group-hover:underline">
          Dialedbase
        </span>
      </span>
    </a>
  );
}

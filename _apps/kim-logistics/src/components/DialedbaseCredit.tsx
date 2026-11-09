import Image from "next/image";

const HREF = "https://dialedbase.com";

export function DialedbaseCredit() {
  return (
    <a
      href={HREF}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-2.5 text-paper/55 no-underline transition-colors hover:text-paper"
      aria-label="Built by Dialedbase — opens dialedbase.com"
    >
      <span className="relative h-8 w-8 shrink-0 overflow-hidden border border-white/15 transition group-hover:border-white/35">
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
        <span className="font-semibold underline-offset-4 group-hover:underline">Dialedbase</span>
      </span>
    </a>
  );
}

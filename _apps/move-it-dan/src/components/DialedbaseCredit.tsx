import Image from "next/image";

const HREF = "https://dialedbase.com";

export function DialedbaseCredit() {
  return (
    <a
      href={HREF}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-2.5 text-white/50 no-underline transition hover:text-white"
      aria-label="Built by Dialedbase"
    >
      <span className="relative h-7 w-7 overflow-hidden rounded-md">
        <Image
          src="/vendor/dialedbase-mark-chalk.png"
          alt=""
          fill
          className="object-contain opacity-70 transition group-hover:opacity-100"
          sizes="28px"
        />
      </span>
      <span className="text-xs tracking-tight">
        Built by <span className="font-semibold underline-offset-2 group-hover:underline">Dialedbase</span>
      </span>
    </a>
  );
}

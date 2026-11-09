import Link from "next/link";
import { site } from "@/content/site";

type CtaBandProps = {
  title?: string;
  body?: string;
};

export function CtaBand({
  title = "Ready when you are",
  body = "Call for a straight answer, or send a quote with your from and to details.",
}: CtaBandProps) {
  return (
    <section className="bg-field">
      <div className="site-shell py-16 md:py-20">
        <div className="flex flex-col items-start justify-between gap-8 bg-ink px-6 py-12 text-white sm:px-10 md:flex-row md:items-center md:px-14 md:py-16">
          <div className="max-w-xl">
            <p className="eyebrow text-signal">Next step</p>
            <h2 className="display mt-3 text-3xl sm:text-4xl md:text-5xl">{title}</h2>
            <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
              {body}
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a href={`tel:${site.phoneTel}`} className="btn bg-white text-ink hover:bg-chalk">
              Call {site.phoneDisplay}
            </a>
            <Link href="/contact" className="btn btn-ghost">
              Get a quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

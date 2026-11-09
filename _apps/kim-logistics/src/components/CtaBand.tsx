"use client";

import Link from "next/link";
import { Magnetic } from "@/components/Motion";
import { MotionHashes } from "@/components/MotionHashes";
import { Reveal } from "@/components/Reveal";
import { contact, homeCopy } from "@/content/site";

export function CtaBand() {
  return (
    <section className="bg-paper">
      <div className="site-shell py-16 md:py-20">
        <Reveal className="relative overflow-hidden bg-ink px-6 py-12 text-paper sm:px-10 md:px-14 md:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,107,26,0.12)_0%,transparent_42%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/60 to-transparent"
          />
          <div className="relative grid gap-8 md:grid-cols-[1.45fr_auto] md:items-end">
            <div>
              <div className="flex items-center gap-3">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-signal">
                  Next step
                </p>
                <MotionHashes tone="signal" />
              </div>
              <h2 className="font-display mt-4 text-3xl tracking-[-0.03em] sm:text-4xl md:text-5xl">
                {homeCopy.ctaTitle}
              </h2>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-paper/72">
                {homeCopy.ctaSupport}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Magnetic>
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center bg-signal px-5 py-3 text-base font-semibold tracking-tight text-ink transition hover:bg-signal-deep hover:text-paper"
                >
                  Start your quote
                </Link>
              </Magnetic>
              <Magnetic strength={0.16}>
                <a
                  href={contact.phoneHref}
                  className="border border-white/30 inline-flex w-full items-center justify-center px-5 py-3 text-base font-semibold tracking-tight text-paper transition hover:border-paper/55"
                >
                  Call {contact.phoneDisplay}
                </a>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

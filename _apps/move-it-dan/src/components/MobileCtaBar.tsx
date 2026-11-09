import Link from "next/link";
import { site } from "@/content/site";

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink p-3 lg:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <a
          href={`tel:${site.phoneTel}`}
          className="cta-pulse flex-1 rounded-sm bg-signal py-3 text-center text-sm font-semibold text-white no-underline"
        >
          Call now
        </a>
        <Link
          href="/contact"
          className="flex-1 rounded-sm border border-white/25 py-3 text-center text-sm font-semibold text-white no-underline"
        >
          Get a quote
        </Link>
      </div>
    </div>
  );
}

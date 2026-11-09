import Link from "next/link";
import { site } from "@/content/site";

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/20 bg-ink p-3 lg:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        <a
          href={`tel:${site.phoneTel}`}
          className="btn btn-signal flex-1 !rounded-sm !py-3 text-sm"
        >
          Call now
        </a>
        <Link
          href="/contact"
          className="btn btn-ghost flex-1 !rounded-sm !py-3 text-sm"
        >
          Get a quote
        </Link>
      </div>
    </div>
  );
}

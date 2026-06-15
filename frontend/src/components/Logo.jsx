import { ASSETS } from "@/mock";
import { cn } from "@/lib/utils";

// Shared dialedbase brand mark. Used across admin, auth and client-facing pages.
export default function Logo({ size = "h-8 w-8", wordmark = false, wordmarkClass }) {
  return (
    <span className="inline-flex items-center gap-2">
      <img src={ASSETS.logoBlack} alt="Dialedbase" className={cn("rounded-md object-contain", size)} />
      {wordmark && (
        <span className={cn("font-semibold tracking-tight", wordmarkClass)}>Dialedbase</span>
      )}
    </span>
  );
}

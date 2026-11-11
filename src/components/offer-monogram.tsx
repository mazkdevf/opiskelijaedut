import { cn } from "@/lib/utils";

export function OfferMonogram({
  provider,
  className,
}: {
  provider: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-xl bg-muted font-display text-lg font-semibold transition-colors",
        className,
      )}
    >
      {provider.charAt(0).toUpperCase()}
    </span>
  );
}

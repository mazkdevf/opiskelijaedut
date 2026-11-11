import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { OfferMonogram } from "@/components/offer-monogram";
import { OfferValue } from "@/components/offer-value";
import type { Locale } from "@/i18n/config";
import type { Offer } from "@/lib/offers";

export function OfferRow({
  offer,
  locale,
  onSelect,
}: {
  offer: Offer;
  locale: Locale;
  onSelect?: (slug: string) => void;
}) {
  const handleClick =
    onSelect &&
    ((event: React.MouseEvent<HTMLAnchorElement>) => {
      const modified = event.metaKey || event.ctrlKey || event.shiftKey;
      if (modified || event.button !== 0) return;
      event.preventDefault();
      onSelect(offer.slug);
    });

  return (
    <Link
      href={`/${locale}/offers/${offer.slug}/`}
      prefetch={false}
      onClick={handleClick}
      className="group -mx-3 grid grid-cols-[auto_1fr] items-center gap-x-4 rounded-xl px-3 py-3.5 transition-colors hover:bg-muted/60 md:grid-cols-[auto_1fr_auto_auto]"
    >
      <OfferMonogram
        provider={offer.provider}
        className="row-span-2 self-start group-hover:bg-highlight group-hover:text-highlight-foreground md:row-span-1 md:self-center"
      />

      <div className="flex min-w-0 items-center justify-between gap-3 md:block">
        <h3 className="flex min-w-0 items-baseline gap-2 font-medium">
          <span className="truncate">{offer.name}</span>
          {offer.region && (
            <span className="shrink-0 font-mono text-[11px] font-normal text-muted-foreground">
              {offer.region}
            </span>
          )}
        </h3>
        <OfferValue offer={offer} className="md:hidden" />
        <p className="mt-0.5 hidden truncate text-sm text-muted-foreground md:block">
          {offer.summary}
        </p>
      </div>

      <p className="col-start-2 mt-1 line-clamp-2 text-sm leading-snug text-muted-foreground md:hidden">
        {offer.summary}
      </p>

      <OfferValue offer={offer} className="hidden md:inline-flex" />
      <ArrowUpRightIcon className="hidden size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground md:block" />
    </Link>
  );
}

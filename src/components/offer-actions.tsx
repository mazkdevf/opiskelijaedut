import { ArrowUpRightIcon } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { Offer } from "@/lib/offers";
import { site } from "@/lib/site";

export function OfferActions({
  offer,
  locale,
}: {
  offer: Offer;
  locale: Locale;
}) {
  const dict = getDictionary(locale);

  return (
    <div className="flex items-center gap-2">
      <Button asChild size="lg" className="flex-1">
        <a href={offer.url} target="_blank" rel="noopener noreferrer">
          {dict.offer.open}
          <ArrowUpRightIcon />
        </a>
      </Button>
      <CopyButton
        iconOnly
        className="size-12"
        value={`${site.url}/${locale}/offers/${offer.slug}/`}
        label={dict.offer.copyLink}
        copiedLabel={dict.offer.copied}
      />
    </div>
  );
}

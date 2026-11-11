"use client";

import { OfferActions } from "@/components/offer-actions";
import { OfferDetails } from "@/components/offer-details";
import { OfferMonogram } from "@/components/offer-monogram";
import { OfferValue } from "@/components/offer-value";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { Offer } from "@/lib/offers";
import { github } from "@/lib/site";

export function OfferSheet({
  offer,
  open,
  locale,
  onClose,
}: {
  offer: Offer | null;
  open: boolean;
  locale: Locale;
  onClose: () => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const dict = getDictionary(locale);
  const onOpenChange = (next: boolean) => {
    if (!next) onClose();
  };

  if (!offer) return null;

  const Title = isDesktop ? DialogTitle : DrawerTitle;
  const Description = isDesktop ? DialogDescription : DrawerDescription;

  const content = (
    <>
      <div className="overflow-y-auto overscroll-contain px-5 pt-3 pb-8 md:px-8 md:pt-8">
        <header className="mb-6 space-y-4 pr-10">
          <div className="flex items-center gap-3">
            <OfferMonogram provider={offer.provider} />
            <div className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
              <p>{offer.provider}</p>
              <p>
                {dict.categories[offer.category]}
                {offer.region && ` · ${offer.region}`}
              </p>
            </div>
          </div>
          <Title className="font-display text-[28px] leading-[1.1] font-semibold tracking-tight text-balance md:text-[32px]">
            {offer.name}
          </Title>
          <OfferValue offer={offer} className="px-3 py-1.5 text-xs" />
          <Description className="sr-only">{offer.summary}</Description>
        </header>

        <OfferDetails offer={offer} locale={locale} />

        <a
          href={github.editOffer(offer.slug)}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block text-[13px] text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          {dict.offer.suggestEdit}
        </a>
      </div>

      <div className="border-t bg-popover px-5 pt-4 pb-safe md:px-8 md:pb-5">
        <OfferActions offer={offer} locale={locale} />
      </div>
    </>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent closeLabel={dict.offer.close}>{content}</DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>{content}</DrawerContent>
    </Drawer>
  );
}

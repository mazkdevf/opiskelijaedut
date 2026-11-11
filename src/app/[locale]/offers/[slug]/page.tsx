import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "lucide-react";
import { OfferActions } from "@/components/offer-actions";
import { OfferDetails } from "@/components/offer-details";
import { OfferMonogram } from "@/components/offer-monogram";
import { OfferRow } from "@/components/offer-row";
import { OfferValue } from "@/components/offer-value";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedAlternates } from "@/lib/metadata";
import { getOffer, getOffers, getOfferSlugs } from "@/lib/offers";
import { github } from "@/lib/site";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getOfferSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const offer = isLocale(locale) ? getOffer(locale, slug) : undefined;
  if (!offer || !isLocale(locale)) return {};

  return {
    title: `${offer.name} · ${offer.value}`,
    description: offer.summary,
    alternates: localizedAlternates(locale, `offers/${slug}/`),
  };
}

export default async function OfferPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const offer = getOffer(locale, slug);
  if (!offer) notFound();

  const dict = getDictionary(locale);
  const related = getOffers(locale).filter(
    (other) => other.category === offer.category && other.slug !== offer.slug,
  );

  return (
    <div className="mx-auto max-w-2xl pt-6 sm:pt-10">
      <Link
        href={`/${locale}/`}
        className="-ml-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" />
        {dict.offer.back}
      </Link>

      <article className="mt-8">
        <header className="mb-8 space-y-5">
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
          <h1 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl">
            {offer.name}
          </h1>
          <OfferValue offer={offer} className="px-3 py-1.5 text-xs" />
        </header>

        <OfferDetails offer={offer} locale={locale} />

        <div className="mt-8">
          <OfferActions offer={offer} locale={locale} />
        </div>
        <a
          href={github.editOffer(offer.slug)}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-block text-[13px] text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          {dict.offer.suggestEdit}
        </a>
      </article>

      {related.length > 0 && (
        <section className="mt-16 border-t pt-8">
          <h2 className="mb-2 font-display text-xl font-semibold tracking-tight">
            {dict.offer.more}
          </h2>
          <ul>
            {related.map((other) => (
              <li key={other.slug}>
                <OfferRow offer={other} locale={locale} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

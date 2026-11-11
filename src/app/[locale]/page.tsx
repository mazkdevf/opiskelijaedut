import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Catalogue } from "@/components/catalogue";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/lib/site";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatDate, formatEuro } from "@/lib/format";
import { caseTotals } from "@/lib/insurance-case";
import { getInsuranceDictionary } from "@/i18n/insurance";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { localizedAlternates } from "@/lib/metadata";
import { getLatestVerification, getOffers } from "@/lib/offers";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? { alternates: localizedAlternates(locale) } : {};
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const insurance = getInsuranceDictionary(locale);
  const offers = getOffers(locale);
  const freeCount = offers.filter((offer) => offer.type === "free").length;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              name: site.name,
              url: `${site.url}/${locale}/`,
              inLanguage: locale,
              description: dict.meta.description,
              image: `${site.url}/og.png`,
            },
            {
              "@type": "ItemList",
              name: dict.meta.title,
              numberOfItems: offers.length,
              itemListElement: offers.map((offer, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: offer.name,
                description: offer.summary,
                url: `${site.url}/${locale}/offers/${offer.slug}/`,
              })),
            },
          ],
        }}
      />
      <section className="pt-10 pb-10 sm:pt-16 sm:pb-14 lg:pt-24 lg:pb-20">
        <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
          {dict.hero.eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,8.5vw,5.75rem)] leading-[0.98] font-semibold tracking-[-0.035em] text-balance">
          {dict.hero.titleStart}{" "}
          <mark className="inline-block -rotate-1 rounded-[0.18em] bg-highlight px-[0.14em] pb-[0.06em] text-highlight-foreground">
            {dict.hero.titleMark}
          </mark>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
          {dict.hero.lead}
        </p>
        <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs">
          <div className="flex items-baseline gap-2">
            <dd className="text-base font-medium text-foreground">
              {offers.length}
            </dd>
            <dt className="text-muted-foreground">{dict.hero.offers}</dt>
          </div>
          <div className="flex items-baseline gap-2">
            <dd className="text-base font-medium text-foreground">
              {freeCount}
            </dd>
            <dt className="text-muted-foreground">{dict.hero.free}</dt>
          </div>
          <div className="flex flex-row-reverse items-baseline gap-2">
            <dd className="text-base font-medium text-foreground">
              {formatDate(getLatestVerification(), locale)}
            </dd>
            <dt className="text-muted-foreground">{dict.hero.updated}</dt>
          </div>
        </dl>
      </section>

      <Link
        href={`/${locale}/insurance/`}
        className="group mb-8 flex items-center justify-between gap-4 rounded-2xl border bg-card px-5 py-4 transition-colors hover:border-foreground/30"
      >
        <p className="text-[15px] leading-snug text-pretty">
          <span className="text-muted-foreground">{insurance.promo}</span>{" "}
          <span className="font-medium whitespace-nowrap">
            {formatEuro(caseTotals.saving, locale)} {insurance.promoUnit}
          </span>
        </p>
        <span className="flex shrink-0 items-center gap-1.5 text-sm font-medium">
          <span className="hidden sm:inline">{insurance.promoAction}</span>
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>

      <Catalogue offers={offers} locale={locale} />
    </>
  );
}

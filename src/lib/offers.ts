import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { cache } from "react";
import type { Locale } from "@/i18n/config";
import { localeTags } from "@/i18n/config";
import {
  offerSchema,
  type Category,
  type OfferFile,
  type OfferType,
  type VerificationMethod,
} from "@/lib/offer-schema";

const OFFERS_DIR = path.join(process.cwd(), "content", "offers");

export type Offer = {
  slug: string;
  name: string;
  provider: string;
  url: string;
  category: Category;
  type: OfferType;
  region?: string;
  value: string;
  summary: string;
  description: string;
  perks: string[];
  eligibility: string;
  steps: string[];
  verification: VerificationMethod[];
  lastVerified: string;
  expires?: string;
};

const readOfferFiles = cache((): Array<{ slug: string; data: OfferFile }> => {
  const today = new Date().toISOString().slice(0, 10);

  return readdirSync(OFFERS_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => ({
      slug: file.replace(/\.json$/, ""),
      data: offerSchema.parse(
        JSON.parse(readFileSync(path.join(OFFERS_DIR, file), "utf8")),
      ),
    }))
    .filter(({ data }) => !data.expires || data.expires >= today);
});

function localize(slug: string, data: OfferFile, locale: Locale): Offer {
  return {
    slug,
    name: data.name,
    provider: data.provider,
    url: data.url,
    category: data.category,
    type: data.type,
    region: data.region?.[locale],
    value: data.value[locale],
    summary: data.summary[locale],
    description: data.description[locale],
    perks: data.perks.map((perk) => perk[locale]),
    eligibility: data.eligibility[locale],
    steps: data.steps.map((step) => step[locale]),
    verification: data.verification,
    lastVerified: data.lastVerified,
    expires: data.expires,
  };
}

export const getOffers = cache((locale: Locale): Offer[] =>
  readOfferFiles()
    .map(({ slug, data }) => localize(slug, data, locale))
    .sort(
      (a, b) =>
        Number(b.type === "free") - Number(a.type === "free") ||
        a.name.localeCompare(b.name, localeTags[locale]),
    ),
);

export function getOffer(locale: Locale, slug: string): Offer | undefined {
  return getOffers(locale).find((offer) => offer.slug === slug);
}

export function getOfferSlugs(): string[] {
  return readOfferFiles().map(({ slug }) => slug);
}

export function getLatestVerification(): string {
  return readOfferFiles()
    .map(({ data }) => data.lastVerified)
    .sort()
    .at(-1)!;
}

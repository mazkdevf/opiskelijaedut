import { localeTags, type Locale } from "@/i18n/config";

export function formatDate(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(localeTags[locale], {
    day: "numeric",
    month: locale === "fi" ? "numeric" : "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function normalize(text: string): string {
  return text.toLocaleLowerCase("fi").normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export function formatEuro(amount: number, locale: Locale, digits = 2): string {
  return new Intl.NumberFormat(localeTags[locale], {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(amount);
}

export function formatPercent(share: number, locale: Locale): string {
  return new Intl.NumberFormat(localeTags[locale], {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(share);
}

export function roundedCount(count: number): string {
  const floor = Math.floor(count / 10) * 10;
  return count < 10 || count === floor ? String(count) : `${floor}+`;
}

export function compactNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(localeTags[locale], {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

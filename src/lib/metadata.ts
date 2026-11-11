import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";

export function localizedAlternates(
  locale: Locale,
  path = "",
): Metadata["alternates"] {
  return {
    canonical: `/${locale}/${path}`,
    languages: Object.fromEntries(
      locales.map((target) => [target, `/${target}/${path}`]),
    ),
  };
}

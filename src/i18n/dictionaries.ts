import type { Locale } from "@/i18n/config";
import { en } from "@/i18n/en";
import { fi, type Dictionary } from "@/i18n/fi";

const dictionaries: Record<Locale, Dictionary> = { fi, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };

export const locales = ["fi", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fi";

export const localeTags: Record<Locale, string> = {
  fi: "fi-FI",
  en: "en-GB",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

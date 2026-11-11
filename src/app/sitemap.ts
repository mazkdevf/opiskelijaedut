import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getOfferSlugs } from "@/lib/offers";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "contribute/",
    "insurance/",
    ...getOfferSlugs().map((slug) => `offers/${slug}/`),
  ];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${site.url}/${locale}/${path}`,
      alternates: {
        languages: Object.fromEntries(
          locales.map((target) => [target, `${site.url}/${target}/${path}`]),
        ),
      },
    })),
  );
}

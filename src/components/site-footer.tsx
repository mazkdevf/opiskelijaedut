import Link from "next/link";
import { GitHubStar } from "@/components/github-star";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getInsuranceDictionary } from "@/i18n/insurance";
import { site } from "@/lib/site";

export function SiteFooter({
  locale,
  dict,
  stars,
}: {
  locale: Locale;
  dict: Dictionary;
  stars: number | null;
}) {
  return (
    <footer className="mt-24 border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 border-b px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <p className="font-display text-2xl font-semibold tracking-tight">
            {dict.footer.starTitle}
          </p>
          <p className="mt-1.5 leading-relaxed text-pretty text-muted-foreground">
            {dict.footer.starBody}
          </p>
        </div>
        <GitHubStar
          label={dict.footer.starAction}
          stars={stars}
          locale={locale}
          size="lg"
          variant="default"
          className="self-start md:self-auto"
        />
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-muted-foreground sm:px-6 md:flex-row md:items-start md:justify-between">
        <p className="max-w-xl leading-relaxed text-pretty">
          {dict.footer.note}
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <Link
            href={`/${locale}/insurance/`}
            className="hover:text-foreground"
          >
            {getInsuranceDictionary(locale).nav}
          </Link>
          <Link
            href={`/${locale}/contribute/`}
            className="hover:text-foreground"
          >
            {dict.nav.contribute}
          </Link>
          <a
            href={site.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            {dict.footer.source}
          </a>
          <a
            href={`${site.repoUrl}/blob/main/LICENSE`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            {dict.footer.license}
          </a>
        </nav>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { GitHubStar } from "@/components/github-star";
import { LocaleSwitch } from "@/components/locale-switch";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getInsuranceDictionary } from "@/i18n/insurance";

export function SiteHeader({
  locale,
  dict,
  stars,
}: {
  locale: Locale;
  dict: Dictionary;
  stars: number | null;
}) {
  return (
    <header className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
      <Logo locale={locale} />

      <div className="flex items-center gap-1 sm:gap-2">
        <nav className="mr-2 hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link href={`/${locale}/`} className="hover:text-foreground">
            {dict.nav.offers}
          </Link>
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
          <GitHubStar label={dict.nav.github} stars={stars} locale={locale} />
        </nav>

        <Button asChild variant="ghost" size="icon" className="md:hidden">
          <Link
            href={`/${locale}/contribute/`}
            aria-label={dict.nav.contribute}
          >
            <PlusIcon />
          </Link>
        </Button>
        <ThemeToggle label={dict.nav.theme} />
        <LocaleSwitch locale={locale} label={dict.nav.language} />
      </div>
    </header>
  );
}

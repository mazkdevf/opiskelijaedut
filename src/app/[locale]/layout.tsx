import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { fontVariables } from "@/lib/fonts";
import { getStarCount } from "@/lib/github";
import { site } from "@/lib/site";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0d" },
  ],
};

export async function generateMetadata({
  params,
}: Pick<Props, "params">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.title, template: `%s – ${site.name}` },
    description: dict.meta.description,
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: locale === "fi" ? "fi_FI" : "en_GB",
      images: [{ url: "/og.png", width: 1280, height: 640, alt: site.name }],
    },
    twitter: { card: "summary_large_image", images: ["/og.png"] },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const stars = await getStarCount();

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only z-50 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            {dict.nav.skip}
          </a>
          <SiteHeader locale={locale} dict={dict} stars={stars} />
          <main
            id="main"
            className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6"
          >
            {children}
          </main>
          <SiteFooter locale={locale} dict={dict} stars={stars} />
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `404 – ${site.name}`,
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="fi" className={fontVariables}>
      <body className="grid min-h-dvh place-items-center px-4">
        <main className="text-center">
          <p className="font-mono text-xs tracking-wider text-muted-foreground">
            404
          </p>
          {locales.map((locale) => {
            const { notFound } = getDictionary(locale);
            return (
              <section key={locale} lang={locale} className="mt-8">
                <h1 className="font-display text-3xl font-semibold tracking-tight">
                  {notFound.title}
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  {notFound.body}
                </p>
                <Button asChild variant="outline" className="mt-5">
                  <a href={`/${locale}/`}>{notFound.action}</a>
                </Button>
              </section>
            );
          })}
        </main>
      </body>
    </html>
  );
}

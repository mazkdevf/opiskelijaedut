import type { Metadata } from "next";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";

const dict = getDictionary(defaultLocale);

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: dict.meta.title,
  description: dict.meta.description,
  alternates: { canonical: `/${defaultLocale}/` },
};

const redirectScript = `(function(){var l=navigator.languages||[navigator.language];var fi=l.some(function(x){return /^fi\\b/i.test(x)});location.replace(fi?"/fi/":"/en/")})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={defaultLocale}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
        <noscript>
          <meta httpEquiv="refresh" content={`0;url=/${defaultLocale}/`} />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}

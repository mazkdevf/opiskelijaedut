"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LocaleSwitch({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname();

  return (
    <nav
      aria-label={label}
      className="flex items-center rounded-full bg-muted p-0.5"
    >
      {locales.map((target) => (
        <Link
          key={target}
          href={pathname.replace(/^\/[^/]+/, `/${target}`)}
          hrefLang={target}
          lang={target}
          aria-current={target === locale ? "true" : undefined}
          className={cn(
            "rounded-full px-2.5 py-1.5 font-mono text-[11px] font-medium uppercase transition-colors",
            target === locale
              ? "bg-card text-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {target}
        </Link>
      ))}
    </nav>
  );
}

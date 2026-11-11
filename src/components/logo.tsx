import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { site } from "@/lib/site";

export function Logo({ locale }: { locale: Locale }) {
  return (
    <Link
      href={`/${locale}/`}
      className="group flex items-center gap-2.5 rounded-md"
    >
      <span
        aria-hidden
        className="grid h-7 -rotate-3 place-items-center rounded-md bg-highlight px-1.5 font-mono text-[11px] font-semibold tracking-tight text-highlight-foreground transition-transform group-hover:rotate-0"
      >
        0&nbsp;€
      </span>
      <span className="font-display text-[19px] font-semibold tracking-tight">
        {site.name}
      </span>
    </Link>
  );
}

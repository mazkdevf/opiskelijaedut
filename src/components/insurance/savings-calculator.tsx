"use client";

import { useId, useState } from "react";
import { Input } from "@/components/ui/input";
import type { Locale } from "@/i18n/config";
import { getInsuranceDictionary } from "@/i18n/insurance";
import { formatEuro, formatPercent } from "@/lib/format";
import { caseTotals } from "@/lib/insurance-case";

const HORIZONS = [1, 3, 5] as const;
const MAX_PREMIUM = 20000;

export function SavingsCalculator({ locale }: { locale: Locale }) {
  const dict = getInsuranceDictionary(locale);
  const id = useId();
  const [input, setInput] = useState("900");

  const premium = Math.min(
    Math.max(Number(input.replace(",", ".")) || 0, 0),
    MAX_PREMIUM,
  );
  const yearly = premium * caseTotals.share;

  return (
    <div className="rounded-2xl border bg-card p-6 sm:p-8">
      <label htmlFor={id} className="block text-sm font-medium">
        {dict.calcInput}
      </label>
      <Input
        id={id}
        inputMode="decimal"
        autoComplete="off"
        value={input}
        onChange={(event) =>
          setInput(event.target.value.replace(/[^\d.,]/g, ""))
        }
        className="mt-2 h-14 max-w-56 font-mono text-xl md:text-xl"
      />

      <p className="mt-6 text-sm text-muted-foreground">
        {dict.calcShare(formatPercent(caseTotals.share, locale))}
      </p>
      <dl
        aria-live="polite"
        className="mt-3 grid grid-cols-3 divide-x overflow-hidden rounded-xl border"
      >
        {HORIZONS.map((years) => (
          <div key={years} className="px-3 py-4 text-center sm:px-5">
            <dt className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
              {dict.years(years)}
            </dt>
            <dd className="mt-1.5 font-display text-xl font-semibold tracking-tight tabular-nums sm:text-3xl">
              {formatEuro(yearly * years, locale, 0)}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
        {dict.calcNote}
      </p>
    </div>
  );
}

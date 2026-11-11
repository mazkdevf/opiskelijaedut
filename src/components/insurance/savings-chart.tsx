import type { Locale } from "@/i18n/config";
import { getInsuranceDictionary } from "@/i18n/insurance";
import { formatEuro } from "@/lib/format";
import { caseTotals, insuranceCase } from "@/lib/insurance-case";
import { cn } from "@/lib/utils";

const scaleMax = Math.max(
  ...insuranceCase.policies.map((policy) => policy.before),
);

function Bar({
  label,
  value,
  locale,
  emphasis,
}: {
  label: string;
  value: number;
  locale: Locale;
  emphasis: boolean;
}) {
  const formatted = formatEuro(value, locale);

  return (
    <div className="grid grid-cols-[4.5rem_1fr] items-center gap-3">
      <span className="text-[13px] text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2.5 border-l border-foreground/25 py-[3px]">
        <div
          title={`${label}: ${formatted}`}
          className={cn(
            "h-5 min-w-1 rounded-r-[4px]",
            emphasis ? "bg-foreground" : "bg-muted-foreground/60",
          )}
          style={{ width: `${(value / scaleMax) * 78}%` }}
        />
        <span
          className={cn(
            "font-mono text-[13px] whitespace-nowrap tabular-nums",
            emphasis ? "font-semibold" : "text-muted-foreground",
          )}
        >
          {formatted}
        </span>
      </div>
    </div>
  );
}

export function SavingsChart({ locale }: { locale: Locale }) {
  const dict = getInsuranceDictionary(locale);

  return (
    <figure>
      <div aria-hidden className="space-y-7">
        {insuranceCase.policies.map((policy) => (
          <div key={policy.id}>
            <div className="mb-2.5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-medium">{dict.policies[policy.id]}</h3>
              <span className="rounded-full bg-highlight px-2.5 py-1 font-mono text-[11px] leading-none font-medium whitespace-nowrap text-highlight-foreground">
                −{formatEuro(policy.before - policy.after, locale)}
              </span>
            </div>
            <div>
              <Bar
                label={dict.before}
                value={policy.before}
                locale={locale}
                emphasis={false}
              />
              <Bar
                label={dict.after}
                value={policy.after}
                locale={locale}
                emphasis
              />
            </div>
          </div>
        ))}
      </div>

      <div className="sr-only">
        <table>
          <caption>{dict.tableCaption}</caption>
          <thead>
            <tr>
              <th scope="col">{dict.policy}</th>
              <th scope="col">
                {dict.before}, {dict.perYear}
              </th>
              <th scope="col">
                {dict.after}, {dict.perYear}
              </th>
              <th scope="col">{dict.saving}</th>
            </tr>
          </thead>
          <tbody>
            {insuranceCase.policies.map((policy) => (
              <tr key={policy.id}>
                <th scope="row">{dict.policies[policy.id]}</th>
                <td>{formatEuro(policy.before, locale)}</td>
                <td>{formatEuro(policy.after, locale)}</td>
                <td>{formatEuro(policy.before - policy.after, locale)}</td>
              </tr>
            ))}
            <tr>
              <th scope="row">{dict.total}</th>
              <td>{formatEuro(caseTotals.before, locale)}</td>
              <td>{formatEuro(caseTotals.after, locale)}</td>
              <td>{formatEuro(caseTotals.saving, locale)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <figcaption className="mt-7 border-t pt-4 text-[13px] leading-relaxed text-muted-foreground">
        {dict.caseNote}
      </figcaption>
    </figure>
  );
}

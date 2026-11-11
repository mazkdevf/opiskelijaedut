import { CheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { formatDate } from "@/lib/format";
import type { Offer } from "@/lib/offers";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h3 className="font-mono text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
        {title}
      </h3>
      {children}
    </section>
  );
}

export function OfferDetails({
  offer,
  locale,
}: {
  offer: Offer;
  locale: Locale;
}) {
  const dict = getDictionary(locale);

  return (
    <div className="space-y-8">
      <p className="text-[15px] leading-relaxed text-pretty">
        {offer.description}
      </p>

      <Section title={dict.offer.perks}>
        <ul className="space-y-2.5">
          {offer.perks.map((perk) => (
            <li key={perk} className="flex gap-3 text-[15px] leading-snug">
              <span className="mt-0.5 grid size-[18px] shrink-0 place-items-center rounded-full bg-highlight text-highlight-foreground">
                <CheckIcon className="size-3" strokeWidth={3} />
              </span>
              {perk}
            </li>
          ))}
        </ul>
      </Section>

      <Section title={dict.offer.eligibility}>
        <p className="text-[15px] leading-relaxed text-pretty">
          {offer.eligibility}
        </p>
      </Section>

      <Section title={dict.offer.steps}>
        <ol className="space-y-3">
          {offer.steps.map((step, index) => (
            <li key={step} className="flex gap-3 text-[15px] leading-snug">
              <span className="w-[18px] shrink-0 pt-px text-center font-mono text-xs leading-5 text-muted-foreground">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </Section>

      <dl className="grid gap-x-8 gap-y-5 border-t pt-6 sm:grid-cols-2">
        <div className="space-y-2">
          <dt className="font-mono text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
            {dict.offer.verification}
          </dt>
          <dd className="flex flex-wrap gap-1.5">
            {offer.verification.map((method) => (
              <Badge key={method} variant="muted">
                {dict.verification[method]}
              </Badge>
            ))}
          </dd>
        </div>
        <div className="space-y-2">
          <dt className="font-mono text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
            {offer.expires ? dict.offer.expires : dict.offer.verified}
          </dt>
          <dd className="font-mono text-sm">
            <time dateTime={offer.expires ?? offer.lastVerified}>
              {formatDate(offer.expires ?? offer.lastVerified, locale)}
            </time>
          </dd>
        </div>
      </dl>

      <p className="text-[13px] leading-relaxed text-muted-foreground">
        {dict.offer.disclaimer}
      </p>
    </div>
  );
}

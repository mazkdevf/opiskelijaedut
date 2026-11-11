import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowDownIcon, PhoneIcon } from "lucide-react";
import { CarViewer } from "@/components/insurance/car-viewer";
import { SavingsCalculator } from "@/components/insurance/savings-calculator";
import { SavingsChart } from "@/components/insurance/savings-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { isLocale } from "@/i18n/config";
import { getInsuranceDictionary } from "@/i18n/insurance";
import { formatEuro, formatPercent } from "@/lib/format";
import { caseTotals, insuranceContact } from "@/lib/insurance-case";
import { localizedAlternates } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getInsuranceDictionary(locale);

  return {
    title: dict.metaTitle,
    description: dict.metaDescription,
    alternates: localizedAlternates(locale, "insurance/"),
  };
}

export default async function InsurancePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getInsuranceDictionary(locale);

  return (
    <div className="pt-8 sm:pt-14">
      <section className="grid items-center gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <div>
          <p className="font-mono text-xs tracking-wider text-muted-foreground uppercase">
            {dict.eyebrow}
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.25rem,6.2vw,4.25rem)] leading-none font-semibold tracking-[-0.03em] text-balance">
            {dict.titleStart}{" "}
            <mark className="inline-block -rotate-1 rounded-[0.18em] bg-highlight px-[0.14em] pb-[0.06em] text-highlight-foreground">
              {dict.titleMark}
            </mark>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            {dict.lead}
          </p>
          <Button asChild size="lg" className="mt-8">
            <a href="#steps">
              {dict.cta}
              <ArrowDownIcon />
            </a>
          </Button>
        </div>

        <figure className="overflow-hidden rounded-3xl border bg-linear-to-b from-muted to-background dark:from-[oklch(0.3_0.008_95)] dark:to-[oklch(0.2_0.007_95)]">
          <CarViewer label={dict.carLabel} />
          <figcaption className="px-5 pb-4 font-mono text-[11px] tracking-wide text-muted-foreground">
            {dict.carCaption}
          </figcaption>
        </figure>
      </section>

      <section
        aria-labelledby="case"
        className="mt-20 grid gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]"
      >
        <div>
          <h2
            id="case"
            className="font-display text-3xl font-semibold tracking-tight text-balance"
          >
            {dict.caseTitle}
          </h2>
          <p className="mt-3 leading-relaxed text-pretty text-muted-foreground">
            {dict.caseLead}
          </p>
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {dict.profile.map((item) => (
              <li key={item}>
                <Badge variant="muted" className="font-sans text-xs">
                  {item}
                </Badge>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t pt-6">
            <p className="font-display text-6xl leading-none font-semibold tracking-[-0.03em] tabular-nums">
              {formatEuro(caseTotals.saving, locale)}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {dict.savedPerYear} · −{formatPercent(caseTotals.share, locale)}
            </p>
            <p className="mt-4 font-mono text-xs text-muted-foreground">
              {formatEuro(caseTotals.before, locale)} →{" "}
              <span className="text-foreground">
                {formatEuro(caseTotals.after, locale)}
              </span>{" "}
              {dict.perYear}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 sm:p-8">
          <SavingsChart locale={locale} />
        </div>
      </section>

      <section
        aria-labelledby="calculator"
        className="mt-20 grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]"
      >
        <div>
          <h2
            id="calculator"
            className="font-display text-3xl font-semibold tracking-tight text-balance"
          >
            {dict.calcTitle}
          </h2>
          <p className="mt-3 leading-relaxed text-pretty text-muted-foreground">
            {dict.calcLead}
          </p>
        </div>
        <SavingsCalculator locale={locale} />
      </section>

      <section
        aria-labelledby="contact"
        className="mt-20 grid gap-x-12 gap-y-6 rounded-2xl border bg-card p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
      >
        <div className="max-w-xl">
          <h2
            id="contact"
            className="font-display text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            {dict.contactTitle}
          </h2>
          <p className="mt-2 leading-relaxed text-pretty text-muted-foreground">
            {dict.contactBody}
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
            {dict.contactNote}
          </p>
        </div>
        <div className="lg:text-right">
          <p className="font-medium">{insuranceContact.name}</p>
          <p className="text-sm text-muted-foreground">
            {dict.contactRole}, {insuranceContact.company}
          </p>
          <Button asChild size="lg" variant="highlight" className="mt-4">
            <a href={`tel:${insuranceContact.phone}`}>
              <PhoneIcon />
              {dict.contactCall} {insuranceContact.phoneDisplay}
            </a>
          </Button>
        </div>
      </section>

      <section
        aria-labelledby="steps"
        className="mt-20 grid scroll-mt-8 gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]"
      >
        <h2
          id="steps"
          className="scroll-mt-8 font-display text-3xl font-semibold tracking-tight text-balance"
        >
          {dict.stepsTitle}
        </h2>
        <ol className="divide-y border-y">
          {dict.steps.map((step, index) => (
            <li key={step.title} className="flex gap-5 py-5">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-highlight font-mono text-xs font-semibold text-highlight-foreground">
                {index + 1}
              </span>
              <div>
                <h3 className="font-medium">{step.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-pretty text-muted-foreground">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="basics" className="mt-20">
        <h2
          id="basics"
          className="font-display text-3xl font-semibold tracking-tight"
        >
          {dict.basicsTitle}
        </h2>
        <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border md:grid-cols-3">
          {dict.basics.map((item) => (
            <li
              key={item.title}
              className="bg-card p-6 outline-1 outline-border"
            >
              <h3 className="font-medium">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-pretty text-muted-foreground">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-[13px] leading-relaxed text-muted-foreground">
          {dict.disclaimer}
        </p>
      </section>
    </div>
  );
}

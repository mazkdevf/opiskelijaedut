import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRightIcon } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedAlternates } from "@/lib/metadata";
import { offerTemplate } from "@/lib/offer-template";
import { github } from "@/lib/site";
import { assistants, getAiPrompt } from "@/lib/ai-prompt";
import { Badge } from "@/components/ui/badge";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);

  return {
    title: dict.contribute.metaTitle,
    description: dict.contribute.lead,
    alternates: localizedAlternates(locale, "contribute/"),
  };
}

export default async function ContributePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { contribute } = getDictionary(locale);
  const aiPrompt = getAiPrompt(locale);

  return (
    <div className="pt-10 sm:pt-16">
      <header className="max-w-3xl">
        <h1 className="font-display text-[clamp(2.25rem,7vw,4rem)] leading-none font-semibold tracking-[-0.03em] text-balance">
          {contribute.title}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
          {contribute.lead}
        </p>
      </header>

      <section
        aria-labelledby="ai"
        className="mt-12 rounded-2xl border bg-card p-6 sm:p-8"
      >
        <div className="grid gap-x-12 gap-y-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="max-w-xl">
            <Badge variant="highlight">{contribute.ai.badge}</Badge>
            <h2
              id="ai"
              className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              {contribute.ai.title}
            </h2>
            <p className="mt-2 leading-relaxed text-pretty text-muted-foreground">
              {contribute.ai.body}
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap lg:justify-end">
            <CopyButton
              variant="default"
              size="lg"
              value={aiPrompt}
              label={contribute.ai.copy}
              copiedLabel={contribute.copied}
            />
            {assistants.map((assistant) => (
              <Button key={assistant.name} asChild size="lg" variant="outline">
                <a
                  href={assistant.url(aiPrompt)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {contribute.ai.openIn(assistant.name)}
                  <ArrowUpRightIcon />
                </a>
              </Button>
            ))}
          </div>
        </div>

        <details className="group mt-6 border-t pt-4">
          <summary className="cursor-pointer text-sm text-muted-foreground select-none hover:text-foreground">
            {contribute.ai.show}
          </summary>
          <pre
            tabIndex={0}
            className="mt-4 max-h-96 overflow-auto rounded-xl bg-muted p-4 font-mono text-[13px] leading-relaxed whitespace-pre-wrap"
          >
            {aiPrompt}
          </pre>
        </details>
        <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
          {contribute.ai.check}
        </p>
      </section>

      <ol
        aria-label={contribute.stepsTitle}
        className="mt-6 grid gap-px overflow-hidden rounded-2xl border md:grid-cols-3"
      >
        {contribute.steps.map((step, index) => (
          <li key={step.title} className="bg-card p-6 outline-1 outline-border">
            <span className="grid size-7 place-items-center rounded-full bg-highlight font-mono text-xs font-semibold text-highlight-foreground">
              {index + 1}
            </span>
            <h2 className="mt-4 font-medium">{step.title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-pretty text-muted-foreground">
              {step.body}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-16 grid gap-x-12 gap-y-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <section aria-labelledby="template" className="min-w-0">
          <div className="flex items-center justify-between gap-4">
            <h2
              id="template"
              className="font-display text-2xl font-semibold tracking-tight"
            >
              {contribute.templateTitle}
            </h2>
            <CopyButton
              size="sm"
              value={offerTemplate}
              label={contribute.copy}
              copiedLabel={contribute.copied}
            />
          </div>

          <pre
            tabIndex={0}
            className="mt-4 max-h-[32rem] overflow-auto rounded-2xl border bg-card p-5 font-mono text-[13px] leading-relaxed"
          >
            <code>{offerTemplate}</code>
          </pre>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Button asChild size="lg">
              <a
                href={github.newOffer(offerTemplate)}
                target="_blank"
                rel="noreferrer"
              >
                {contribute.openInGithub}
                <ArrowUpRightIcon />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={github.suggestOffer} target="_blank" rel="noreferrer">
                {contribute.noCode}
              </a>
            </Button>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {contribute.noCodeHint}
          </p>
        </section>

        <aside className="space-y-12">
          <section aria-labelledby="rules">
            <h2
              id="rules"
              className="font-display text-2xl font-semibold tracking-tight"
            >
              {contribute.rulesTitle}
            </h2>
            <ul className="mt-4 space-y-3 text-[15px] leading-snug">
              {contribute.rules.map((rule) => (
                <li key={rule} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-[7px] size-1.5 shrink-0 rounded-full bg-highlight"
                  />
                  {rule}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="fields">
            <h2
              id="fields"
              className="font-display text-2xl font-semibold tracking-tight"
            >
              {contribute.fieldsTitle}
            </h2>
            <dl className="mt-4 divide-y border-y text-sm">
              {contribute.fields.map(([field, description]) => (
                <div key={field} className="py-3">
                  <dt className="font-mono text-[13px] font-medium">{field}</dt>
                  <dd className="mt-1 leading-relaxed text-muted-foreground">
                    {description}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </aside>
      </div>
    </div>
  );
}

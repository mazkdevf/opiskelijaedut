"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { SearchIcon, XIcon } from "lucide-react";
import {
  CategoryChips,
  FiltersDrawer,
  FreeOnlySwitch,
  type CategoryFilter,
  type FilterOption,
} from "@/components/catalogue-filters";
import { OfferRow } from "@/components/offer-row";
import { OfferSheet } from "@/components/offer-sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOfferParam } from "@/hooks/use-offer-param";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { normalize } from "@/lib/format";
import { categories } from "@/lib/offer-schema";
import type { Offer } from "@/lib/offers";

export function Catalogue({
  offers,
  locale,
}: {
  offers: Offer[];
  locale: Locale;
}) {
  const dict = getDictionary(locale);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [freeOnly, setFreeOnly] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const { slug, open, close } = useOfferParam();
  const activeOffer = offers.find((offer) => offer.slug === slug) ?? null;
  const [shownOffer, setShownOffer] = useState<Offer | null>(null);
  if (activeOffer && activeOffer !== shownOffer) setShownOffer(activeOffer);

  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      const typing =
        target.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
      if (event.key !== "/" || typing) return;
      event.preventDefault();
      searchRef.current?.focus();
    }
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  const searched = useMemo(() => {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    return offers.filter((offer) => {
      if (freeOnly && offer.type !== "free") return false;
      const words = normalize(
        [
          offer.name,
          offer.provider,
          offer.summary,
          offer.value,
          offer.region ?? "",
          dict.categories[offer.category],
        ].join(" "),
      ).split(/[^\p{L}\p{N}]+/u);
      return terms.every((term) => words.some((word) => word.startsWith(term)));
    });
  }, [offers, query, freeOnly, dict]);

  const options: FilterOption[] = [
    { value: "all", label: dict.catalogue.all, count: searched.length },
    ...categories.map((value) => ({
      value,
      label: dict.categories[value],
      count: searched.filter((offer) => offer.category === value).length,
    })),
  ];

  const groups = categories
    .filter((value) => category === "all" || category === value)
    .map((value) => ({
      category: value,
      offers: searched.filter((offer) => offer.category === value),
    }))
    .filter((group) => group.offers.length > 0);

  const resultCount = groups.reduce(
    (total, group) => total + group.offers.length,
    0,
  );

  const filterProps = {
    dict,
    options,
    category,
    freeOnly,
    onCategoryChange: setCategory,
    onFreeOnlyChange: setFreeOnly,
  };

  return (
    <div id="offers">
      <div className="sticky top-0 z-30 -mx-4 border-b bg-background/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div className="flex items-center gap-2 md:gap-6">
          <div className="relative flex-1 md:max-w-sm">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={searchRef}
              type="search"
              inputMode="search"
              enterKeyHint="search"
              autoComplete="off"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={dict.catalogue.searchPlaceholder}
              aria-label={dict.catalogue.searchLabel}
              className="pr-11 pl-10 [&::-webkit-search-cancel-button]:hidden"
            />
            {query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  searchRef.current?.focus();
                }}
                aria-label={dict.catalogue.clearSearch}
                className="absolute top-1/2 right-1.5 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted-foreground hover:text-foreground"
              >
                <XIcon className="size-4" />
              </button>
            ) : (
              <kbd className="pointer-events-none absolute top-1/2 right-3.5 hidden -translate-y-1/2 rounded border px-1.5 font-mono text-[11px] leading-5 text-muted-foreground md:block">
                /
              </kbd>
            )}
          </div>

          <p
            className="hidden font-mono text-xs text-muted-foreground md:block"
            aria-live="polite"
          >
            {dict.catalogue.results(resultCount)}
          </p>

          <FreeOnlySwitch {...filterProps} className="ml-auto hidden md:flex" />
          <div className="md:hidden">
            <FiltersDrawer {...filterProps} resultCount={resultCount} />
          </div>
        </div>

        <div className="mt-2 hidden md:block">
          <CategoryChips {...filterProps} />
        </div>
      </div>

      {groups.length === 0 ? (
        <div className="mx-auto max-w-sm py-20 text-center">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            {dict.catalogue.emptyTitle}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">
            {dict.catalogue.emptyBody}
          </p>
          <Button asChild variant="outline" className="mt-6">
            <Link href={`/${locale}/contribute/`}>
              {dict.catalogue.emptyAction}
            </Link>
          </Button>
        </div>
      ) : (
        <div>
          {groups.map((group) => (
            <section
              key={group.category}
              aria-labelledby={`category-${group.category}`}
              className="grid gap-x-10 gap-y-2 border-b py-6 last:border-b-0 md:grid-cols-[12rem_1fr] md:py-8"
            >
              <header className="flex items-baseline justify-between gap-3 md:sticky md:top-32 md:block md:self-start md:pt-3.5">
                <h2
                  id={`category-${group.category}`}
                  className="font-display text-xl font-semibold tracking-tight"
                >
                  {dict.categories[group.category]}
                </h2>
                <p className="font-mono text-xs text-muted-foreground md:mt-1">
                  {dict.catalogue.results(group.offers.length)}
                </p>
              </header>
              <ul>
                {group.offers.map((offer) => (
                  <li key={offer.slug}>
                    <OfferRow offer={offer} locale={locale} onSelect={open} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      <OfferSheet
        offer={shownOffer}
        open={activeOffer !== null}
        locale={locale}
        onClose={close}
      />
    </div>
  );
}

"use client";

import { useId } from "react";
import { CheckIcon, SlidersHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Switch } from "@/components/ui/switch";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Category } from "@/lib/offer-schema";
import { cn } from "@/lib/utils";

export type CategoryFilter = Category | "all";

export type FilterOption = {
  value: CategoryFilter;
  label: string;
  count: number;
};

type FilterProps = {
  dict: Dictionary;
  options: FilterOption[];
  category: CategoryFilter;
  freeOnly: boolean;
  onCategoryChange: (category: CategoryFilter) => void;
  onFreeOnlyChange: (freeOnly: boolean) => void;
};

export function FreeOnlySwitch({
  dict,
  freeOnly,
  onFreeOnlyChange,
  className,
}: Pick<FilterProps, "dict" | "freeOnly" | "onFreeOnlyChange"> & {
  className?: string;
}) {
  const id = useId();

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <label htmlFor={id} className="cursor-pointer text-sm select-none">
        {dict.catalogue.freeOnly}
      </label>
      <Switch id={id} checked={freeOnly} onCheckedChange={onFreeOnlyChange} />
    </div>
  );
}

export function CategoryChips({
  dict,
  options,
  category,
  onCategoryChange,
}: Pick<FilterProps, "dict" | "options" | "category" | "onCategoryChange">) {
  return (
    <div
      role="group"
      aria-label={dict.catalogue.category}
      className="-mx-1 scrollbar-none flex gap-1.5 overflow-x-auto px-1 py-1"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={option.value === category}
          disabled={option.count === 0}
          onClick={() => onCategoryChange(option.value)}
          className={cn(
            "flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 text-[13px] transition-colors disabled:opacity-40",
            option.value === category
              ? "border-primary bg-primary text-primary-foreground"
              : "hover:bg-accent",
          )}
        >
          {option.label}
          <span className="font-mono text-[11px] opacity-60">
            {option.count}
          </span>
        </button>
      ))}
    </div>
  );
}

export function FiltersDrawer({
  dict,
  options,
  category,
  freeOnly,
  resultCount,
  onCategoryChange,
  onFreeOnlyChange,
}: FilterProps & { resultCount: number }) {
  const activeCount = Number(category !== "all") + Number(freeOnly);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="h-11 shrink-0 px-3.5"
          aria-label={dict.catalogue.filters}
        >
          <SlidersHorizontalIcon />
          {activeCount > 0 && (
            <span className="grid size-5 place-items-center rounded-full bg-highlight font-mono text-[11px] text-highlight-foreground">
              {activeCount}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="overflow-y-auto overscroll-contain px-5 pt-3 pb-4">
          <DrawerTitle className="font-display text-2xl font-semibold tracking-tight">
            {dict.catalogue.filtersTitle}
          </DrawerTitle>
          <DrawerDescription className="mt-1 text-sm text-muted-foreground">
            {dict.catalogue.filtersDescription}
          </DrawerDescription>

          <div className="mt-5 flex h-14 items-center justify-between border-y">
            <FreeOnlySwitch
              dict={dict}
              freeOnly={freeOnly}
              onFreeOnlyChange={onFreeOnlyChange}
              className="w-full justify-between [&_label]:text-base"
            />
          </div>

          <ul
            role="group"
            aria-label={dict.catalogue.category}
            className="mt-2"
          >
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  aria-pressed={option.value === category}
                  disabled={option.count === 0}
                  onClick={() => onCategoryChange(option.value)}
                  className="flex h-12 w-full items-center gap-3 text-left text-base disabled:opacity-40"
                >
                  <span
                    className={cn(
                      "grid size-5 shrink-0 place-items-center rounded-full border",
                      option.value === category &&
                        "border-highlight bg-highlight text-highlight-foreground",
                    )}
                  >
                    {option.value === category && (
                      <CheckIcon className="size-3" strokeWidth={3} />
                    )}
                  </span>
                  <span className="flex-1">{option.label}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {option.count}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2 border-t px-5 pt-4 pb-safe">
          <Button
            variant="outline"
            size="lg"
            disabled={activeCount === 0}
            onClick={() => {
              onCategoryChange("all");
              onFreeOnlyChange(false);
            }}
          >
            {dict.catalogue.reset}
          </Button>
          <DrawerClose asChild>
            <Button size="lg" className="flex-1">
              {dict.catalogue.showResults(resultCount)}
            </Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

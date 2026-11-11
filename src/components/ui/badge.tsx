import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center rounded-full px-2.5 py-1 font-mono text-[11px] leading-none font-medium tracking-tight whitespace-nowrap",
  {
    variants: {
      variant: {
        highlight: "bg-highlight text-highlight-foreground",
        outline: "border border-input text-foreground",
        muted: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { variant: "outline" },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };

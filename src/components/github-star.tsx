import { StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/config";
import { compactNumber } from "@/lib/format";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type GitHubStarProps = {
  label: string;
  stars: number | null;
  locale: Locale;
  className?: string;
} & Pick<React.ComponentProps<typeof Button>, "size" | "variant">;

export function GitHubStar({
  label,
  stars,
  locale,
  size = "sm",
  variant = "outline",
  className,
}: GitHubStarProps) {
  return (
    <Button
      asChild
      size={size}
      variant={variant}
      className={cn("group", className)}
    >
      <a href={site.repoUrl} target="_blank" rel="noreferrer">
        <StarIcon className="transition-colors group-hover:fill-highlight group-hover:text-highlight" />
        {label}
        {stars !== null && stars > 0 && (
          <span className="border-l pl-2 font-mono text-[0.85em] tabular-nums opacity-80">
            {compactNumber(stars, locale)}
          </span>
        )}
      </a>
    </Button>
  );
}

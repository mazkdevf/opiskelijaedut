import { Badge } from "@/components/ui/badge";
import type { Offer } from "@/lib/offers";

export function OfferValue({
  offer,
  className,
}: {
  offer: Pick<Offer, "type" | "value">;
  className?: string;
}) {
  return (
    <Badge
      variant={offer.type === "free" ? "highlight" : "outline"}
      className={className}
    >
      {offer.value}
    </Badge>
  );
}

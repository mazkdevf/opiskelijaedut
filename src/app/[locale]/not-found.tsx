import Link from "next/link";
import { Button } from "@/components/ui/button";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default function NotFound() {
  const dict = getDictionary(defaultLocale);

  return (
    <div className="py-24 text-center">
      <h1 className="font-display text-4xl font-semibold tracking-tight">
        {dict.notFound.title}
      </h1>
      <p className="mt-3 text-muted-foreground">{dict.notFound.body}</p>
      <Button asChild className="mt-8">
        <Link href={`/${defaultLocale}/`}>{dict.notFound.action}</Link>
      </Button>
    </div>
  );
}

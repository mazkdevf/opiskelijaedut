import { defaultLocale } from "@/i18n/config";
import { site } from "@/lib/site";

export default function RootPage() {
  return <a href={`/${defaultLocale}/`}>{site.name}</a>;
}

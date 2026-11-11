import type { Locale } from "@/i18n/config";
import {
  categories,
  offerTypes,
  verificationMethods,
} from "@/lib/offer-schema";
import { offerTemplate } from "@/lib/offer-template";
import { site } from "@/lib/site";

const list = (values: readonly string[]) => values.join(", ");

const prompts: Record<Locale, () => string> = {
  fi: () => `Auta minua lisäämään opiskelijaetu Opiskelijaedut-sivustolle (${site.repoUrl}). Sivusto listaa palveluita, jotka opiskelija saa Suomessa ilmaiseksi tai selvästi halvemmalla. Jokainen etu on yksi JSON-tiedosto kansiossa ${site.offersDir}.

Tehtäväsi:
1. Avaa viestin lopussa oleva linkki. Jos pystyt hakemaan verkosta, lue tarjoajan oma sivu ja sen ehdot. Jos et pysty, kerro se ja pyydä minua liittämään sivun teksti.
2. Varmista, että etu on voimassa ja saatavilla Suomessa opiskelevalle. Jos se ei ole, kerro se äläkä tee tiedostoa.
3. Kirjoita JSON-tiedosto alla olevien sääntöjen mukaan.
4. Kerro lopuksi tiedostolle sopiva nimi ja listaa kohdat, joita et pystynyt varmistamaan tarjoajan sivulta.

Säännöt:
- Käytä vain tietoja, jotka löytyvät tarjoajan omalta sivulta. Älä arvaa hintoja, kestoja tai ehtoja.
- Kirjoita jokainen teksti sekä suomeksi (fi) että englanniksi (en). Lyhyesti ja asiallisesti, ei mainoskieltä.
- url: suora https-linkki tarjoajan sivulle, ei affiliate-linkkejä eikä seurantaparametreja.
- category: yksi näistä: ${list(categories)}.
- type: ${list(offerTypes)}. Käytä arvoa free vain, jos etu on opiskelijalle kokonaan maksuton.
- value: enintään 24 merkkiä, esimerkiksi "Ilmainen", "12 kk ilmaiseksi" tai "−50 %".
- summary: yksi virke, enintään 140 merkkiä. description: enintään 600 merkkiä.
- perks: yhdestä kuuteen konkreettista hyötyä. steps: yhdestä kuuteen vaihetta edun käyttöönottoon.
- verification: yksi tai useampi näistä: ${list(verificationMethods)}.
- region: lisää vain, jos etu on paikallinen, esimerkiksi {"fi": "Oulu", "en": "Oulu"}.
- lastVerified: tämä päivä muodossa VVVV-KK-PP. expires: lisää vain, jos sivulla kerrotaan päättymispäivä.
- Tiedoston nimi: pienillä kirjaimilla ja väliviivoilla, esimerkiksi palvelun-nimi.json.
- Älä lisää kenttiä, joita pohjassa ei ole.

Pohja:
${offerTemplate}
Vastaa näin: ensin JSON yhdessä koodilohkossa, sitten tiedoston nimi, sitten varmistamatta jääneet kohdat. Kerro lopuksi, että tiedosto lisätään osoitteessa ${site.repoUrl}/new/main/${site.offersDir} ja siitä avataan pull request.

Linkki tarjoukseen: `,
  en: () => `Help me add a student offer to Opiskelijaedut (${site.repoUrl}). The site lists services that students in Finland get for free or at a clear discount. Every offer is a single JSON file in ${site.offersDir}.

Your task:
1. Open the link at the end of this message. If you can browse the web, read the provider's own page and its terms. If you cannot, say so and ask me to paste the text of the page.
2. Confirm that the offer is current and available to people studying in Finland. If it is not, tell me and do not write the file.
3. Write the JSON file following the rules below.
4. Finish with a suitable file name and a list of anything you could not confirm on the provider's page.

Rules:
- Only use facts found on the provider's own page. Do not guess prices, durations or terms.
- Write every text in both Finnish (fi) and English (en). Short and factual, no marketing language.
- url: a direct https link to the provider's page, with no affiliate links or tracking parameters.
- category: one of ${list(categories)}.
- type: ${list(offerTypes)}. Use free only if the offer costs students nothing at all.
- value: at most 24 characters, such as "Free", "12 months free" or "−50%".
- summary: one sentence, at most 140 characters. description: at most 600 characters.
- perks: one to six concrete benefits. steps: one to six steps to claim the offer.
- verification: one or more of ${list(verificationMethods)}.
- region: only add it if the offer is local, for example {"fi": "Oulu", "en": "Oulu"}.
- lastVerified: today's date as YYYY-MM-DD. expires: only add it if the page states an end date.
- File name: lowercase with hyphens, for example service-name.json.
- Do not add fields that are not in the template.

Template:
${offerTemplate}
Answer like this: first the JSON in a single code block, then the file name, then the points you could not confirm. End by telling me that the file is added at ${site.repoUrl}/new/main/${site.offersDir} and a pull request is opened from there.

Link to the offer: `,
};

export function getAiPrompt(locale: Locale): string {
  return prompts[locale]();
}

export const assistants = [
  {
    name: "Claude",
    url: (prompt: string) =>
      `https://claude.ai/new?q=${encodeURIComponent(prompt)}`,
  },
  {
    name: "ChatGPT",
    url: (prompt: string) =>
      `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`,
  },
] as const;

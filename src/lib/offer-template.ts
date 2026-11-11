import type { OfferFile } from "@/lib/offer-schema";

const template: OfferFile = {
  $schema: "../offer.schema.json",
  name: "Palvelun nimi",
  provider: "Tarjoaja",
  url: "https://example.com/students",
  category: "productivity",
  type: "free",
  value: { fi: "Ilmainen", en: "Free" },
  summary: {
    fi: "Yksi virke siitä, mitä opiskelija saa.",
    en: "One sentence on what the student gets.",
  },
  description: {
    fi: "Muutama virke: mitä etu sisältää, kuinka kauan se on voimassa ja mitä sen jälkeen tapahtuu.",
    en: "A few sentences: what the offer includes, how long it lasts and what happens afterwards.",
  },
  perks: [{ fi: "Konkreettinen hyöty", en: "A concrete benefit" }],
  eligibility: {
    fi: "Kuka edun saa.",
    en: "Who is eligible.",
  },
  steps: [
    { fi: "Ensimmäinen vaihe.", en: "First step." },
    { fi: "Toinen vaihe.", en: "Second step." },
  ],
  verification: ["school-email"],
  lastVerified: new Date().toISOString().slice(0, 10),
};

export const offerTemplate = `${JSON.stringify(template, null, 2)}\n`;

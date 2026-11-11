import { z } from "zod";

export const categories = [
  "ai",
  "development",
  "design",
  "productivity",
  "entertainment",
  "food",
  "shopping",
  "wellbeing",
  "transport",
  "finance",
  "everyday",
] as const;

export const verificationMethods = [
  "school-email",
  "sheerid",
  "unidays",
  "student-card",
  "document",
  "provider-check",
  "none",
] as const;

export const offerTypes = ["free", "discount"] as const;

const localized = (max: number) =>
  z.strictObject({
    fi: z.string().trim().min(1).max(max),
    en: z.string().trim().min(1).max(max),
  });

export const offerSchema = z
  .strictObject({
    $schema: z.string().optional(),
    name: z
      .string()
      .trim()
      .min(1)
      .max(60)
      .describe("Name of the offer or product."),
    provider: z
      .string()
      .trim()
      .min(1)
      .max(40)
      .describe("Company or organisation behind the offer."),
    url: z
      .url({ protocol: /^https$/ })
      .describe(
        "Direct https link to the provider's own page. No affiliate links.",
      ),
    category: z.enum(categories).describe("Section the offer is listed under."),
    type: z
      .enum(offerTypes)
      .describe("free if it costs students nothing, otherwise discount."),
    region: localized(40)
      .optional()
      .describe("City or area, only for local offers. Example: Oulu."),
    value: localized(24).describe(
      "Short badge shown in the list. Examples: Ilmainen, 12 kk ilmaiseksi, −50 %.",
    ),
    summary: localized(140).describe("One sentence shown in the list."),
    description: localized(600).describe(
      "A few sentences on what the offer includes and what happens afterwards.",
    ),
    perks: z
      .array(localized(160))
      .min(1)
      .max(6)
      .describe("Concrete things the student gets."),
    eligibility: localized(400).describe(
      "Who qualifies: age, type of studies, place of residence.",
    ),
    steps: z
      .array(localized(200))
      .min(1)
      .max(6)
      .describe("Steps to claim the offer, in order."),
    verification: z
      .array(z.enum(verificationMethods))
      .min(1)
      .describe("How student status is checked."),
    lastVerified: z.iso
      .date()
      .describe("Day the details were last checked on the provider's page."),
    expires: z.iso
      .date()
      .optional()
      .describe("Day the offer ends. Expired offers are hidden automatically."),
  })
  .meta({
    title: "Opiskelijaedut offer",
    description:
      "A single student offer shown on the site. One file per offer.",
  });

export type OfferFile = z.infer<typeof offerSchema>;
export type Category = (typeof categories)[number];
export type VerificationMethod = (typeof verificationMethods)[number];
export type OfferType = (typeof offerTypes)[number];

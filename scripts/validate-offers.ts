import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import { offerSchema } from "../src/lib/offer-schema";

const dir = path.join(process.cwd(), "content", "offers");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const today = new Date().toISOString().slice(0, 10);

const problems: string[] = [];
const seenNames = new Map<string, string>();
const files = readdirSync(dir).sort();

for (const file of files) {
  const report = (message: string) => problems.push(`${file}: ${message}`);

  if (!file.endsWith(".json")) {
    report("only .json files belong in content/offers");
    continue;
  }

  if (!slugPattern.test(file.replace(/\.json$/, ""))) {
    report("file name must be lowercase kebab-case, e.g. service-name.json");
  }

  let json: unknown;
  try {
    json = JSON.parse(readFileSync(path.join(dir, file), "utf8"));
  } catch (error) {
    report(`invalid JSON (${(error as Error).message})`);
    continue;
  }

  const result = offerSchema.safeParse(json);
  if (!result.success) {
    report(`\n${z.prettifyError(result.error)}`);
    continue;
  }

  const offer = result.data;

  if (offer.lastVerified > today) {
    report("lastVerified is in the future");
  }
  if (offer.expires && offer.expires < offer.lastVerified) {
    report("expires is earlier than lastVerified");
  }

  const name = offer.name.toLowerCase();
  const duplicate = seenNames.get(name);
  if (duplicate) {
    report(`same name as ${duplicate}`);
  }
  seenNames.set(name, file);
}

if (problems.length > 0) {
  console.error(`Found ${problems.length} problem(s):\n`);
  for (const problem of problems) console.error(`  ${problem}\n`);
  process.exit(1);
}

console.log(`${files.length} offers are valid.`);

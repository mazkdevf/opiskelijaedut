import { writeFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import { offerSchema } from "../src/lib/offer-schema";

const target = path.join(process.cwd(), "content", "offer.schema.json");
const schema = z.toJSONSchema(offerSchema, { target: "draft-7" });

writeFileSync(target, `${JSON.stringify(schema, null, 2)}\n`);
console.log(`Wrote ${path.relative(process.cwd(), target)}`);

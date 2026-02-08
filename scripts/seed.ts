import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as csv from "fast-csv";
import { db } from "../server/db/index";
import { households, guests } from "../server/db/schema";
import { eq } from "drizzle-orm";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Row {
  household_nickname: string;
  mailing_address?: string;
  guest_name?: string;
  relationship_type: "primary" | "plus_one" | "child";
}

async function seed() {
  const csvFileName = process.argv[2] || "seed.csv";
  const csvPath = path.resolve(__dirname, csvFileName);

  if (!fs.existsSync(csvPath)) {
    console.error(`❌ CSV file not found: ${csvPath}`);
    process.exit(1);
  }

  const failures: string[] = [];

  console.log(`🌱 Starting database seed from ${csvFileName}...`);

  const householdCache = new Map<string, string>();
  const addressCache = new Map<string, string>();

  const stream = fs
    .createReadStream(csvPath)
    .pipe(csv.parse({ headers: true, trim: true }));

  for await (const row of stream) {
    const {
      household_nickname: nickname,
      mailing_address: rowAddress,
      guest_name: guestName,
      relationship_type: relationshipType,
    } = row as Row;

    if (!nickname || !relationshipType) {
      const msg = `⚠️ Skipping row due to missing nickname or relationship type: ${JSON.stringify(row)}`;
      console.warn(msg);
      failures.push(msg);
      continue;
    }

    // Update address cache if address is provided in this row
    if (rowAddress) {
      addressCache.set(nickname, rowAddress);
    }

    const mailingAddress = rowAddress || addressCache.get(nickname);

    let householdId = householdCache.get(nickname);

    if (!householdId) {
      // Check if household already exists in DB
      const existing = await db.query.households.findFirst({
        where: eq(households.nickname, nickname),
      });

      if (existing) {
        householdId = existing.id;
        householdCache.set(nickname, householdId);
        if (existing.mailingAddress) {
          addressCache.set(nickname, existing.mailingAddress);
        }
      } else {
        if (!mailingAddress) {
          const msg = `❌ Cannot create household "${nickname}": mailing address is missing. Please provide it in at least one row for this household.`;
          console.error(msg);
          failures.push(msg);
          continue;
        }
        try {
          console.log(`🏠 Creating household: ${nickname}`);
          const insertedHouseholds = await db
            .insert(households)
            .values({
              nickname: nickname,
              mailingAddress: mailingAddress,
            })
            .returning({ id: households.id });

          const newHousehold = insertedHouseholds[0];
          if (!newHousehold)
            throw new Error(`Failed to create household: ${nickname}`);

          householdId = newHousehold.id;
          householdCache.set(nickname, householdId);
        } catch (error: any) {
          const msg = `❌ Failed to create household ${nickname}: ${error?.message || error}`;
          console.error(msg);
          failures.push(msg);
          continue; // Move to next row
        }
      }
    }

    try {
      console.log(
        `👤 Adding guest: ${guestName || "Unspecified"} (${relationshipType})`,
      );
      await db.insert(guests).values({
        householdId: householdId!,
        name: guestName || null,
        relationshipType: relationshipType as "primary" | "plus_one" | "child",
        isSearchable: relationshipType === "primary",
      });
    } catch (error: any) {
      // Handle unique constraint violation (guest already exists)
      if (
        error?.code === "23505" ||
        error?.message?.includes("unique constraint")
      ) {
        console.warn(`⚠️ Guest "${guestName}" already exists, skipping...`);
      } else {
        const msg = `❌ "${guestName}" - failed to add guest: ${error?.cause?.message || error?.message || error}`;
        failures.push(msg);
      }
    }
  }

  if (failures.length > 0) {
    console.log("\n--- Seeding Failures Summary ---");
    failures.forEach((f) => console.log(f));
    console.log("-------------------------------\n");
  }

  console.log("✅ Seeding completed!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});

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
  mailing_address: string;
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

  console.log(`🌱 Starting database seed from ${csvFileName}...`);

  const householdCache = new Map<string, string>();

  const stream = fs
    .createReadStream(csvPath)
    .pipe(csv.parse({ headers: true, trim: true }));

  for await (const row of stream) {
    const {
      household_nickname: nickname,
      mailing_address: mailingAddress,
      guest_name: guestName,
      relationship_type: relationshipType,
    } = row as Row;

    if (!nickname || !mailingAddress || !relationshipType) {
      console.warn("⚠️ Skipping row due to missing data:", row);
      continue;
    }

    let householdId = householdCache.get(nickname);

    if (!householdId) {
      // Check if household already exists in DB
      const existing = await db.query.households.findFirst({
        where: eq(households.nickname, nickname),
      });

      if (existing) {
        householdId = existing.id;
        householdCache.set(nickname, householdId);
      } else {
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
        } catch (error) {
          console.error(`❌ Failed to create household ${nickname}:`, error);
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
        console.error(
          `❌ Failed to add guest "${guestName}":`,
          error?.cause?.message,
        );
      }
    }
  }

  console.log("✅ Seeding completed!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});

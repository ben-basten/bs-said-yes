import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { db, households, members } from "../server/db/index";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
  console.log("🌱 Starting database seed...");

  const csvPath = path.join(__dirname, "seed.csv");
  const csvData = fs.readFileSync(csvPath, "utf-8");

  // Basic CSV parser (handles quoted commas)
  const rows = csvData
    .split("\n")
    .filter((row) => row.trim() !== "")
    .slice(1) // Skip header
    .map((row) => {
      const result = [];
      let current = "";
      let inQuotes = false;
      for (let i = 0; i < row.length; i++) {
        if (row[i] === '"') inQuotes = !inQuotes;
        else if (row[i] === "," && !inQuotes) {
          result.push(current.trim());
          current = "";
        } else {
          current += row[i];
        }
      }
      result.push(current.trim());
      return result;
    });

  const householdCache = new Map<string, string>();

  for (const row of rows) {
    if (row.length < 4) continue;
    const [nickname, mailingAddress, guestName, relationshipType] = row;

    if (!nickname || !mailingAddress || !relationshipType) {
      continue;
    }

    let householdId = householdCache.get(nickname);

    if (!householdId) {
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
    }

    console.log(
      `👤 Adding guest: ${guestName || "Unspecified"} (${relationshipType})`,
    );
    await db.insert(members).values({
      householdId: householdId,
      name: guestName || undefined,
      relationshipType: relationshipType as "primary" | "plus_one" | "child",
      isSearchable: relationshipType === "primary",
    });
  }

  console.log("✅ Seeding completed!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});

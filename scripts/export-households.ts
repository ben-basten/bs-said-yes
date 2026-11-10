import { writeFile } from "node:fs/promises";
import process from "node:process";
import { asc } from "drizzle-orm";
import { db } from "../server/db/index";
import { households } from "../server/db/schema";

async function exportHouseholds() {
  const allHouseholds = await db
    .select({
      name: households.nickname,
      address: households.mailingAddress,
    })
    .from(households)
    .orderBy(asc(households.nickname));

  const contents = allHouseholds
    .map(({ name, address }) => `${name}\n${address}`)
    .join("\n\n");

  await writeFile("households.txt", `${contents}\n`, "utf8");
  console.log(`Exported ${allHouseholds.length} households to households.txt`);
}

exportHouseholds().then(
  () => process.exit(0),
  (error) => {
    console.error("Failed to export households:", error);
    process.exit(1);
  },
);

import process from "node:process";
import { asc, eq } from "drizzle-orm";
import { db } from "../server/db/index";
import { guests, households } from "../server/db/schema";

async function listAttendingGuests() {
  const attendingGuests = await db
    .select({
      householdId: households.id,
      name: guests.name,
    })
    .from(guests)
    .innerJoin(households, eq(guests.householdId, households.id))
    .where(eq(guests.isAttending, true))
    .orderBy(asc(households.nickname), asc(households.id), asc(guests.name));

  let previousHouseholdId: string | undefined;
  for (const guest of attendingGuests) {
    if (!guest.name) continue;
    if (guest.householdId !== previousHouseholdId) {
      if (previousHouseholdId) console.log();
      previousHouseholdId = guest.householdId;
    }
    console.log(guest.name);
  }

  if (previousHouseholdId) console.log();
  console.log(`Total attending: ${attendingGuests.length}`);
}

listAttendingGuests().then(
  () => process.exit(0),
  (error) => {
    console.error("Failed to list attending guests:", error);
    process.exit(1);
  },
);

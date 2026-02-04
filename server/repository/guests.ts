import { eq, isNull, not, inArray, and, count, sql } from "drizzle-orm";
import { db } from "~~/server/db";
import { guests } from "~~/server/db/schema";

export const findGuestByName = async (name: string) => {
  const trimmedName = name.trim();
  return db.query.guests.findFirst({
    where: (guests, { ilike, and, eq }) =>
      and(
        ilike(guests.name, trimmedName),
        eq(guests.isSearchable, true),
        not(isNull(guests.name)),
      ),
    with: {
      household: {
        with: {
          guests: true,
        },
      },
    },
  });
};

export const findGuestById = async (id: string) => {
  return db.query.guests.findFirst({
    where: eq(guests.id, id),
  });
};

export const updateHouseholdAttendance = async (
  householdId: string,
  attendingGuestIds: string[],
) => {
  return db.transaction(async (tx) => {
    // Mark all household guests as not attending first
    await tx
      .update(guests)
      .set({ isAttending: false })
      .where(eq(guests.householdId, householdId));

    // Update only the attending guests
    if (attendingGuestIds.length > 0) {
      await tx
        .update(guests)
        .set({ isAttending: true })
        .where(
          and(
            eq(guests.householdId, householdId),
            inArray(guests.id, attendingGuestIds),
          ),
        );
    }
  });
};

export const getAttendanceStatus = async () => {
  return db
    .select({
      attending: count(sql`CASE WHEN ${guests.isAttending} = true THEN 1 END`),
      notAttending: count(
        sql`CASE WHEN ${guests.isAttending} = false THEN 1 END`,
      ),
      notResponded: count(
        sql`CASE WHEN ${guests.isAttending} IS NULL THEN 1 END`,
      ),
    })
    .from(guests);
};

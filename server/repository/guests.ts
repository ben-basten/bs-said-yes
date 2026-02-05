import { eq, isNull, not, inArray, and, count, sql, desc } from "drizzle-orm";
import { db } from "~~/server/db";
import { guests, households } from "~~/server/db/schema";

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

export const paginatedGuestList = async (limit: number, offset: number) => {
  const [guestList, totalCount] = await Promise.all([
    db
      .select({
        id: guests.id,
        name: guests.name,
        isAttending: guests.isAttending,
        relationshipType: guests.relationshipType,
        householdNickname: households.nickname,
      })
      .from(guests)
      .leftJoin(households, eq(guests.householdId, households.id))
      .orderBy(desc(guests.updatedAt))
      .limit(limit)
      .offset(offset),
    db.$count(guests),
  ]);

  return { guestList, totalCount };
};

export const updatePlusOneName = async (
  householdId: string,
  guestId: string,
  name: string,
) => {
  return db
    .update(guests)
    .set({ name })
    .where(
      and(
        eq(guests.id, guestId),
        eq(guests.householdId, householdId),
        eq(guests.relationshipType, "plus_one"),
      ),
    );
};

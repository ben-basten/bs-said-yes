import { eq, isNull, not, inArray, and } from "drizzle-orm";
import { db, members } from "~~/server/db";

export const findMemberByName = async (name: string) => {
  const trimmedName = name.trim();
  return db.query.members.findFirst({
    where: (members, { ilike, and, eq }) =>
      and(
        ilike(members.name, trimmedName),
        eq(members.isSearchable, true),
        not(isNull(members.name)),
      ),
    with: {
      household: {
        with: {
          members: true,
        },
      },
    },
  });
};

export const findMemberById = async (id: string) => {
  return db.query.members.findFirst({
    where: eq(members.id, id),
  });
};

export const updateHouseholdAttendance = async (
  householdId: string,
  attendingMemberIds: string[],
) => {
  return db.transaction(async (tx) => {
    // Mark all household members as not attending first
    await tx
      .update(members)
      .set({ isAttending: false })
      .where(eq(members.householdId, householdId));

    // Update only the attending members
    if (attendingMemberIds.length > 0) {
      await tx
        .update(members)
        .set({ isAttending: true })
        .where(
          and(
            eq(members.householdId, householdId),
            inArray(members.id, attendingMemberIds),
          ),
        );
    }
  });
};

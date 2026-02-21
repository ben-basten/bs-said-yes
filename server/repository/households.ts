import { eq, asc } from "drizzle-orm";
import { db } from "~~/server/db";
import { households, guests } from "~~/server/db/schema";

export const getPaginatedHouseholds = async (limit: number, page: number) => {
  const offset = (page - 1) * limit;

  const [items, total] = await Promise.all([
    db
      .select({
        id: households.id,
        nickname: households.nickname,
        mailingAddress: households.mailingAddress,
        inviteSent: households.inviteSent,
        updatedAt: households.updatedAt,
      })
      .from(households)
      .orderBy(asc(households.inviteSent), asc(households.nickname))
      .limit(limit)
      .offset(offset),
    db.$count(households),
  ]);

  return {
    items,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const createHousehold = async (data: {
  nickname: string;
  mailingAddress: string;
  guests: {
    name: string | null;
    relationshipType: "primary" | "plus_one" | "child";
  }[];
}) => {
  return db.transaction(async (tx) => {
    const [household] = await tx
      .insert(households)
      .values({
        nickname: data.nickname,
        mailingAddress: data.mailingAddress,
      })
      .returning();

    if (!household) {
      throw new Error("Failed to create household");
    }

    if (data.guests.length > 0) {
      await tx.insert(guests).values(
        data.guests.map((guest) => ({
          ...guest,
          householdId: household.id,
          isSearchable: guest.relationshipType === "primary",
        })),
      );
    }

    return household;
  });
};

export const updateHousehold = async (
  id: string,
  data: {
    nickname?: string;
    mailingAddress?: string;
    inviteSent?: boolean;
  },
) => {
  return db
    .update(households)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(households.id, id))
    .returning();
};

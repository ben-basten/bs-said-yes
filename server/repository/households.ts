import { eq, desc } from "drizzle-orm";
import { db } from "~~/server/db";
import { households } from "~~/server/db/schema";

export const getPaginatedHouseholds = async (limit: number, page: number) => {
  const offset = (page - 1) * limit;

  const [items, total] = await Promise.all([
    db
      .select()
      .from(households)
      .orderBy(desc(households.createdAt))
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

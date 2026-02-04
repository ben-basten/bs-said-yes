import { z } from "zod";
import { db } from "~~/server/db";
import { guests, households } from "~~/server/db/schema";
import { desc, eq } from "drizzle-orm";

const querySchema = z.object({
  limit: z.coerce.number().min(1).max(50).optional().default(10),
  page: z.coerce.number().min(1).optional().default(1),
});

export default defineEventHandler(async (event) => {
  if (!event.context.isAdmin) {
    throw createError({ statusCode: 403, message: "Forbidden" });
  }

  const { limit: pageSize, page } = await getValidatedQuery(
    event,
    querySchema.parse,
  );

  const offset = (page - 1) * pageSize;

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
      .orderBy(desc(guests.createdAt))
      .limit(pageSize)
      .offset(offset),
    db.$count(guests),
  ]);

  return {
    guests: guestList,
    pagination: {
      page,
      pageSize,
      total: totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
    },
  };
});

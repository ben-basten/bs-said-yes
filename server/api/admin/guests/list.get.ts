import { db } from "~~/server/db";
import { guests, households } from "~~/server/db/schema";
import { desc, eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  if (!event.context.isAdmin) {
    throw createError({ statusCode: 403, message: "Forbidden" });
  }

  const query = getQuery(event);
  const page = Math.max(1, parseInt(query.page as string) || 1);
  const pageSize = Math.min(
    50,
    Math.max(1, parseInt(query.limit as string) || 10),
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

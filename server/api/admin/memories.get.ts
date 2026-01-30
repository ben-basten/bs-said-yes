import { desc } from "drizzle-orm";
import z from "zod";
import { db } from "~~/server/db";
import { stories } from "~~/server/db/schema";

const querySchema = z.object({
  limit: z.number().min(1).max(100).optional(),
  page: z.number().min(1).optional(),
});

export default defineEventHandler(async (event) => {
  if (!event.context.isAdmin) {
    throw createError({ statusCode: 403, message: "Forbidden" });
  }

  const { limit = 20, page = 1 } = await getValidatedQuery(
    event,
    querySchema.parse,
  );

  const memories = await db
    .select({
      id: stories.id,
      title: stories.title,
      author: stories.author,
    })
    .from(stories)
    .orderBy(desc(stories.createdAt))
    .limit(limit)
    .offset((page - 1) * limit);

  return { memories };
});

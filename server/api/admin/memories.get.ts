import { z } from "zod";
import { getMemories } from "~~/server/repository/memories";

const querySchema = z.object({
  limit: z.coerce.number().min(1).max(50).optional(),
  page: z.coerce.number().min(1).optional(),
});

export default defineEventHandler(async (event) => {
  if (!event.context.isAdmin) {
    throw createError({ statusCode: 403, message: "Forbidden" });
  }

  const { limit = 20, page = 1 } = await getValidatedQuery(
    event,
    querySchema.parse,
  );

  return await getMemories(limit, page);
});

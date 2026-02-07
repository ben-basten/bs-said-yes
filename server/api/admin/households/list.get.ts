import { z } from "zod";
import { getPaginatedHouseholds } from "~~/server/repository/households";

const querySchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(20),
  page: z.coerce.number().min(1).default(1),
});

export default defineEventHandler(async (event) => {
  if (!event.context.isAdmin) {
    throw createError({ statusCode: 403, message: "Forbidden" });
  }

  const { limit, page } = await getValidatedQuery(event, querySchema.parse);

  return await getPaginatedHouseholds(limit, page);
});

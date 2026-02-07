import { z } from "zod";
import { paginatedGuestList } from "~~/server/repository/guests";

const querySchema = z.object({
  limit: z.coerce.number().min(1).max(50).optional().default(10),
  page: z.coerce.number().min(1).optional().default(1),
});

export default defineEventHandler(async (event) => {
  if (!event.context.isAdmin) {
    throw createError({ statusCode: 403, message: "Forbidden" });
  }

  const { limit, page } = await getValidatedQuery(event, querySchema.parse);

  const offset = (page - 1) * limit;

  const { guestList, totalCount } = await paginatedGuestList(limit, offset);

  return {
    guests: guestList,
    pagination: {
      page,
      limit,
      total: totalCount,
      totalPages: Math.ceil(totalCount / limit),
    },
  };
});

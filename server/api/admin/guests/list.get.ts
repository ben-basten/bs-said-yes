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

  const { limit: pageSize, page } = await getValidatedQuery(
    event,
    querySchema.parse,
  );

  const offset = (page - 1) * pageSize;

  const { guestList, totalCount } = await paginatedGuestList(pageSize, offset);

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

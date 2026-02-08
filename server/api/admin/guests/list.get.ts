import { z } from "zod";
import { paginatedGuestList } from "~~/server/repository/guests";
import { requireAdminSession } from "~~/server/utils/admin";
import type { Pagination } from "~~/shared/types/Pagination";

const querySchema = z.object({
  limit: z.coerce.number().min(1).max(50).optional().default(10),
  page: z.coerce.number().min(1).optional().default(1),
});

export default defineEventHandler(async (event) => {
  await requireAdminSession(event);

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
    } satisfies Pagination,
  };
});

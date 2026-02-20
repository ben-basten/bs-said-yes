import { z } from "zod";
import { paginatedGuestList } from "~~/server/repository/guests";
import { requireAdminSession } from "~~/server/utils/admin";
import type { Pagination } from "~~/shared/types/Pagination";

const querySchema = z.object({
  limit: z.coerce.number().min(1).max(50).optional().default(10),
  page: z.coerce.number().min(1).optional().default(1),
  sort: z
    .enum(["name_asc", "name_desc", "updated_desc"])
    .optional()
    .default("updated_desc"),
});

export default defineEventHandler(async (event) => {
  await requireAdminSession(event);

  const { limit, page, sort } = await getValidatedQuery(
    event,
    querySchema.parse,
  );

  const offset = (page - 1) * limit;

  const { guestList, totalCount } = await paginatedGuestList(
    limit,
    offset,
    sort,
  );

  return {
    guests: guestList,
    pagination: {
      sort,
      page,
      limit,
      total: totalCount,
      totalPages: Math.ceil(totalCount / limit),
    } satisfies Pagination,
  };
});

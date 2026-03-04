import { z } from "zod";
import { getPaginatedHouseholds } from "~~/server/repository/households";
import { isHouseholdAttending } from "~~/server/utils/helpers";
import type { Pagination } from "~~/shared/types/Pagination";

const querySchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(20),
  page: z.coerce.number().min(1).default(1),
});

const convert = (
  households: Awaited<ReturnType<typeof getPaginatedHouseholds>>["items"],
) => {
  return households.map((household) => ({
    id: household.id,
    nickname: household.nickname,
    mailingAddress: household.mailingAddress,
    inviteSent: household.inviteSent,
    updatedAt: household.updatedAt,
    isAttending: isHouseholdAttending(household.guests),
    guests: household.guests,
  }));
};

export default defineEventHandler(async (event) => {
  await requireAdminSession(event);

  const { limit, page } = await getValidatedQuery(event, querySchema.parse);

  const { items, pagination } = await getPaginatedHouseholds(limit, page);
  return {
    items: convert(items),
    pagination: pagination satisfies Pagination,
  };
});

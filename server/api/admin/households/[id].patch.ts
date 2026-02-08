import { z } from "zod";
import { updateHousehold } from "~~/server/repository/households";
import { requireAdminSession } from "~~/server/utils/admin";

const bodySchema = z.object({
  nickname: z.string().min(1).optional(),
  mailingAddress: z.string().min(1).optional(),
  inviteSent: z.boolean().optional(),
});

export default defineEventHandler(async (event) => {
  await requireAdminSession(event);

  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, message: "Missing household ID" });
  }

  const body = await readValidatedBody(event, bodySchema.parse);

  const updated = await updateHousehold(id, body);

  if (!updated.length) {
    throw createError({ statusCode: 404, message: "Household not found" });
  }

  return updated[0];
});

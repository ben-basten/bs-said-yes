import { z } from "zod";
import { updateGuest } from "~~/server/repository/guests";
import { requireAdminSession } from "~~/server/utils/admin";

const bodySchema = z.object({
  name: z.string().min(1).optional(),
  isAttending: z.coerce.boolean().nullable().optional(),
});

export default defineEventHandler(async (event) => {
  await requireAdminSession(event);

  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, message: "Missing guest ID" });
  }

  const body = await readValidatedBody(event, bodySchema.parse);

  const updated = await updateGuest(id, body);

  if (!updated.length) {
    throw createError({ statusCode: 404, message: "Guest not found" });
  }

  return updated[0];
});

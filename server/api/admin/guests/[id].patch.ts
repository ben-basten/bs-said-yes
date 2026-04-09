import { z } from "zod";
import { updateGuest } from "~~/server/repository/guests";
import { requireAdminSession } from "~~/server/utils/admin";
import { normalizeNameSpacing } from "~~/server/utils/helpers";

const bodySchema = z.object({
  name: z.string().trim().min(1).transform(normalizeNameSpacing).optional(),
  isAttending: z.coerce.boolean().nullable().optional(),
  isSearchable: z.coerce.boolean().optional(),
});

export default defineEventHandler(async (event) => {
  await requireAdminSession(event);

  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ status: 400, message: "Missing guest ID" });
  }

  const body = await readValidatedBody(event, bodySchema.parse);

  const updated = await updateGuest(id, body);

  if (!updated.length) {
    throw createError({ status: 404, message: "Guest not found" });
  }

  return updated[0];
});

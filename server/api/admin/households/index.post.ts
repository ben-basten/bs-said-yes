import { z } from "zod";
import { createHousehold } from "~~/server/repository/households";
import { requireAdminSession } from "~~/server/utils/admin";
import { normalizeNameSpacing } from "~~/server/utils/helpers";

const bodySchema = z.object({
  nickname: z.string().min(1),
  mailingAddress: z.string().min(1),
  guests: z
    .array(
      z.object({
        name: z
          .string()
          .trim()
          .min(1)
          .transform(normalizeNameSpacing)
          .nullable(),
        relationshipType: z.enum(["primary", "plus_one", "child"]),
      }),
    )
    .min(1),
});

export default defineEventHandler(async (event) => {
  await requireAdminSession(event);

  const body = await readValidatedBody(event, bodySchema.parse);

  const household = await createHousehold(body);

  return household;
});

import { z } from "zod";
import { createHousehold } from "~~/server/repository/households";

const bodySchema = z.object({
  nickname: z.string().min(1),
  mailingAddress: z.string().min(1),
  guests: z
    .array(
      z.object({
        name: z.string().nullable(),
        relationshipType: z.enum(["primary", "plus_one", "child"]),
      }),
    )
    .min(1),
});

export default defineEventHandler(async (event) => {
  if (!event.context.isAdmin) {
    throw createError({ statusCode: 403, message: "Forbidden" });
  }

  const body = await readValidatedBody(event, bodySchema.parse);

  const household = await createHousehold(body);

  return household;
});

import { cmsClient } from "~~/server/utils/client";
import { z } from "zod";

const querySchema = z.object({
  slug: z.string().regex(/^[a-zA-Z0-9-]+$/, { message: "Invalid slug" }),
});

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  const { slug } = await getValidatedQuery(event, querySchema.parse);

  const page = await cmsClient.getEntries({
    content_type: "pageStandard",
    "fields.slug": slug,
    limit: 1,
  });

  if (page.items.length === 0) {
    throw createError({
      statusCode: 404,
      statusMessage: `Page with slug '${slug}' not found`,
    });
  }

  return page.items[0];
});

import { cmsClient } from "~~/server/utils/client";

export default defineEventHandler(async (event) => {
  const { slug } = getQuery<{ slug: string }>(event);

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing 'slug' query parameter",
    });
  }

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

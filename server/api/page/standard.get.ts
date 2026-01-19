import { fetchContentful } from "~~/server/utils/client";
import { PAGE_STANDARD_QUERY } from "~~/server/graphql/queries/page-standard.query";
import type { PageStandardQuery } from "~~/shared/types/graphql";
import { z } from "zod";

const querySchema = z.object({
  slug: z.string().regex(/^[a-zA-Z0-9-]+$/, { message: "Invalid slug" }),
});

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  const { slug } = await getValidatedQuery(event, querySchema.parse);

  const data = await fetchContentful<PageStandardQuery>(PAGE_STANDARD_QUERY, {
    slug,
  });

  const page = data.pageStandardCollection?.items[0];

  if (!page) {
    throw createError({
      statusCode: 404,
      statusMessage: `Page with slug '${slug}' not found`,
    });
  }

  return page;
});

import { fetchContentful } from "~~/server/service/contentful";
import { PAGE_STANDARD_QUERY } from "~~/server/graphql/queries/page-standard.query";
import type {
  PageStandardQuery,
  PageStandardQueryVariables,
} from "~~/shared/types/graphql";
import { z } from "zod";

const querySchema = z.object({
  slug: z.string().regex(/^[a-zA-Z0-9-]+$/, { message: "Invalid slug" }),
  preview: z.coerce.boolean().optional().default(false),
});

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  const { slug, preview } = await getValidatedQuery(event, querySchema.parse);

  const isPreview = preview && event.context.isAdmin === true;

  const data = await fetchContentful<
    PageStandardQuery,
    PageStandardQueryVariables
  >(PAGE_STANDARD_QUERY, {
    slug,
    preview: isPreview,
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

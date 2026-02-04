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
  token: z.string().optional(),
});

const { previewSecret } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  const { slug, preview, token } = await getValidatedQuery(
    event,
    querySchema.parse,
  );

  const shouldPreview = preview && token === previewSecret;
  if ((token || preview) && !shouldPreview) {
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden",
    });
  }

  const data = await fetchContentful<
    PageStandardQuery,
    PageStandardQueryVariables
  >(PAGE_STANDARD_QUERY, {
    slug,
    preview: shouldPreview,
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

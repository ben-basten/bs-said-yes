import { fetchContentful } from "~~/server/service/contentful";
import { PAGE_STANDARD_QUERY } from "~~/server/graphql/queries/page-standard.query";
import type {
  PageStandardQuery,
  PageStandardQueryVariables,
} from "~~/shared/types/graphql";
import { z } from "zod";

const querySchema = z.object({
  slug: z.string().regex(/^[a-zA-Z0-9-]+$/, { message: "Invalid slug" }),
  token: z.string().optional(),
});

const { previewSecret } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  await requireUserSession(event);

  const { slug, token } = await getValidatedQuery(event, querySchema.parse);

  const shouldPreview = token === previewSecret;
  if (token && !shouldPreview) {
    throw createError({
      statusCode: 403,
      statusMessage: "Forbidden",
    });
  }

  return cachedPage(slug, shouldPreview);
});

const cachedPage = defineCachedFunction(
  async (slug: string, preview: boolean) => {
    const data = await fetchContentful<
      PageStandardQuery,
      PageStandardQueryVariables
    >(PAGE_STANDARD_QUERY, {
      slug,
      preview,
    });

    const page = data.pageStandardCollection?.items[0];

    if (!page) {
      throw createError({
        statusCode: 404,
        statusMessage: `Page with slug '${slug}' not found`,
      });
    }

    return page;
  },
  {
    shouldBypassCache: (_, preview) => preview,
    maxAge: 60 * 5, // 5 minutes
    name: "pages",
    getKey: (slug) => slug,
  },
);

import { fetchContentful } from "~~/server/service/contentful";
import type { SeoQuery, SeoQueryVariables } from "~~/shared/types/graphql";
import { SEO_QUERY } from "~~/server/graphql/queries/seo.query";

export default defineEventHandler(async () => {
  const data = await fetchContentful<SeoQuery, SeoQueryVariables>(SEO_QUERY);
  return data.componentSeo;
});

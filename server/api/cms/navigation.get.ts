import { fetchContentful } from "~~/server/service/contentful";
import { NAVIGATION_QUERY } from "~~/server/graphql/queries/navigation.query";
import type {
  NavigationQuery,
  NavigationQueryVariables,
} from "~~/shared/types/graphql";

export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  return cachedNavigation();
});

export const cachedNavigation = defineCachedFunction(
  async () => {
    const data = await fetchContentful<
      NavigationQuery,
      NavigationQueryVariables
    >(NAVIGATION_QUERY);

    const navigation = data.navigationCollection?.items[0];

    if (!navigation) {
      throw createError({
        statusCode: 404,
        statusMessage: "Navigation not found",
      });
    }

    return navigation;
  },
  {
    maxAge: 60 * 60, // 1 hour
    name: "cms",
    getKey: () => "navigation",
  },
);

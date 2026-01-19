import { fetchContentful } from "~~/server/utils/client";
import { NAVIGATION_QUERY } from "~~/server/graphql/queries/navigation.query";
import type {
  NavigationQuery,
  NavigationQueryVariables,
} from "~~/shared/types/graphql";

export default defineEventHandler(async () => {
  const data = await fetchContentful<NavigationQuery, NavigationQueryVariables>(
    NAVIGATION_QUERY,
  );

  const navigation = data.navigationCollection?.items[0];

  if (!navigation) {
    throw createError({
      statusCode: 404,
      statusMessage: "Navigation not found",
    });
  }

  return navigation;
});

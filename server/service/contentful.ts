import { GraphQLClient } from "graphql-request";
import gqlmin from "gqlmin";

const { cmsSpace, cmsApiKey, cmsEnv } = useRuntimeConfig();

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${cmsSpace}/environments/${cmsEnv}`;

export const cmsClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${cmsApiKey}`,
  },
});

export const fetchContentful = async <
  Response,
  Variables extends Record<string, unknown>,
>(
  query: string,
  variables?: Variables,
): Promise<Response> => {
  const minifiedQuery = gqlmin(query);
  return cmsClient.request<Response>(minifiedQuery, variables).catch((err) => {
    const errors = err?.response?.errors;
    if (errors?.length) {
      // eslint-disable-next-line no-console
      console.error(
        "Contentful GraphQL request failed. Errors:",
        ...errors.map((e: { message: string }) => e?.message),
      );
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch CMS data.",
    });
  });
};

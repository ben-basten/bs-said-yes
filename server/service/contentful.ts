import { GraphQLClient } from "graphql-request";
import gqlmin from "gqlmin";

const { cmsSpace, cmsApiKey, cmsPreviewApiKey, cmsEnv } = useRuntimeConfig();

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${cmsSpace}/environments/${cmsEnv}`;

const cmsClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${cmsApiKey}`,
  },
});

const cmsPreviewClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${cmsPreviewApiKey}`,
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
  const client = variables?.preview === true ? cmsPreviewClient : cmsClient;
  return client.request<Response>(minifiedQuery, variables).catch((err) => {
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
      statusMessage: "Failed to fetch data from Contentful CMS",
    });
  });
};

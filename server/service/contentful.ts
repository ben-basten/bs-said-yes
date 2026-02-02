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
  return cmsClient.request<Response>(minifiedQuery, variables);
};

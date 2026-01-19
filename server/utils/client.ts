import { GraphQLClient } from "graphql-request";

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
  return cmsClient.request<Response>(query, variables);
};

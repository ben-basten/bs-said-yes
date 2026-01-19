import { GraphQLClient } from "graphql-request";

const { cmsSpace, cmsApiKey, cmsEnv } = useRuntimeConfig();

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${cmsSpace}/environments/${cmsEnv}`;

export const cmsClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: `Bearer ${cmsApiKey}`,
  },
});

export const fetchContentful = async <T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> => {
  return cmsClient.request<T>(query, variables);
};

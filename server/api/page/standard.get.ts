import { GraphQLClient, gql } from "graphql-request";

export default defineEventHandler(async (event) => {
  const { slug } = getQuery<{ slug: string }>(event);

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing 'slug' query parameter",
    });
  }

  const endpoint = process.env.CONTENTFUL_GRAPHQL_ENDPOINT;
  const accessToken = process.env.CONTENTFUL_GRAPHQL_TOKEN;

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const query = gql`
    query GetPageStandard($slug: String!) {
      pageStandardCollection(where: { slug: $slug }, limit: 1) {
        items {
          sys {
            id
          }
          cmsName
          slug
          contentModulesCollection {
            items {
              __typename
              ... on HomepageHero {
                sys {
                  id
                }
                heading
              }
              # Add more fragments for other module types as needed
            }
          }
        }
      }
    }
  `;

  const variables = { slug };
  const data = await graphQLClient.request(query, variables);
  const page = data.pageStandardCollection.items[0];

  if (!page) {
    throw createError({
      statusCode: 404,
      statusMessage: `Page with slug '${slug}' not found`,
    });
  }

  return page;
});

import { gql } from "graphql-request";

export const PAGE_STANDARD_QUERY = gql`
  query PageStandard($slug: String!) {
    pageStandardCollection(where: { slug: $slug }, limit: 1) {
      items {
        cmsName
        slug
        contentModulesCollection {
          items {
            __typename
            ... on HomepageHero {
              __typename
              heading
            }
            ... on TestModule {
              __typename
              fieldA
            }
          }
        }
      }
    }
  }
`;

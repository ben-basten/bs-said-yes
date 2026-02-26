import { gql } from "graphql-request";

export const SEO_FRAGMENT = gql`
  fragment SEO on ComponentSeo {
    title
    ogImage {
      url
    }
  }
`;

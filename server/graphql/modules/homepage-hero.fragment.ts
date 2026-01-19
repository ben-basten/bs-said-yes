import { gql } from "graphql-request";

export const HOMEPAGE_HERO_FRAGMENT = gql`
  fragment HomepageHero on HomepageHero {
    heading
    copy {
      json
    }
    image {
      ...Image
    }
  }
`;

import { gql } from "graphql-request";

export const HOMEPAGE_HERO_FRAGMENT = gql`
  fragment HomepageHero on HomepageHero {
    eyebrow
    heading
    copy {
      json
    }
    image {
      ...Image
    }
    imagesCollection(limit: 5) {
      items {
        ...Image
      }
    }
  }
`;

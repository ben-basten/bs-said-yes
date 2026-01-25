import { gql } from "graphql-request";

export const HOMEPAGE_HERO_FRAGMENT = gql`
  fragment HomepageHero on HomepageHero {
    eyebrow
    heading
    date
    location
    imagesCollection(limit: 4) {
      items {
        ...Image
      }
    }
  }
`;

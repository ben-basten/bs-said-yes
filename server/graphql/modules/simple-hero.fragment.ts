import { gql } from "graphql-request";

export const SIMPLE_HERO_FRAGMENT = gql`
  fragment SimpleHero on ModuleSimpleHero {
    heading
    copy {
      json
    }
    image {
      ...Image
    }
  }
`;

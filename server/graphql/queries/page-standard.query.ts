import { gql } from "graphql-request";
import { HOMEPAGE_HERO_FRAGMENT } from "../modules/homepage-hero.fragment";
import { IMAGE_FRAGMENT } from "../fragments/Image.fragment";

export const PAGE_STANDARD_QUERY = gql`
  query PageStandard($slug: String!) {
    pageStandardCollection(where: { slug: $slug }, limit: 1) {
      items {
        ... on PageStandard {
          ...PageStandard
        }
      }
    }
  }
  fragment PageStandard on PageStandard {
    cmsName
    slug
    contentModulesCollection(limit: 15) {
      items {
        __typename
        ... on HomepageHero {
          ...HomepageHero
        }
      }
    }
  }
  ${HOMEPAGE_HERO_FRAGMENT}
  ${IMAGE_FRAGMENT}
`;

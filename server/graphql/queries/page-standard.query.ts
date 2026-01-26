import { gql } from "graphql-request";
import { HOMEPAGE_HERO_FRAGMENT } from "../modules/homepage-hero.fragment";
import { IMAGE_FRAGMENT } from "../fragments/Image.fragment";
import { FIFTY_FIFTY_FRAGMENT } from "../modules/fifty-fifty.fragment";
import { LINK_FRAGMENT } from "../fragments/Link.fragment";
import { ACCORDION_FRAGMENT } from "../modules/accordion.fragment";

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
        ... on ModuleFiftyfifty {
          ...FiftyFifty
        }
        ... on ModuleAccordion {
          ...Accordion
        }
      }
    }
  }
  ${HOMEPAGE_HERO_FRAGMENT}
  ${FIFTY_FIFTY_FRAGMENT}
  ${ACCORDION_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
`;

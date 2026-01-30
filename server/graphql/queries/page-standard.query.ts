import { gql } from "graphql-request";
import { HOMEPAGE_HERO_FRAGMENT } from "../modules/homepage-hero.fragment";
import { IMAGE_FRAGMENT } from "../fragments/image.fragment";
import { FIFTY_FIFTY_FRAGMENT } from "../modules/fifty-fifty.fragment";
import { LINK_FRAGMENT } from "../fragments/link.fragment";
import { ACCORDION_FRAGMENT } from "../modules/accordion.fragment";
import { SCHEDULE_FRAGMENT } from "../modules/schedule.fragment";
import { SIMPLE_HERO_FRAGMENT } from "../modules/simple-hero.fragment";
import { CENTER_TEXT_FRAGMENT } from "../modules/center-text.fragment";
import { FORM_FRAGMENT } from "../modules/form.fragment";
import { CALL_TO_ACTION_FRAGMENT } from "../modules/call-to-action.fragment";

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
    seoTitle
    contentModulesCollection(limit: 15) {
      items {
        __typename
        ... on HomepageHero {
          ...HomepageHero
        }
        ... on ModuleSimpleHero {
          ...SimpleHero
        }
        ... on ModuleFiftyfifty {
          ...FiftyFifty
        }
        ... on ModuleAccordion {
          ...Accordion
        }
        ... on ModuleSchedule {
          ...Schedule
        }
        ... on ModuleCenterText {
          ...CenterText
        }
        ... on ModuleForm {
          ...Form
        }
        ... on ModuleCallToAction {
          ...CallToAction
        }
      }
    }
  }
  ${HOMEPAGE_HERO_FRAGMENT}
  ${FIFTY_FIFTY_FRAGMENT}
  ${ACCORDION_FRAGMENT}
  ${SCHEDULE_FRAGMENT}
  ${IMAGE_FRAGMENT}
  ${LINK_FRAGMENT}
  ${SIMPLE_HERO_FRAGMENT}
  ${CENTER_TEXT_FRAGMENT}
  ${FORM_FRAGMENT}
  ${CALL_TO_ACTION_FRAGMENT}
`;

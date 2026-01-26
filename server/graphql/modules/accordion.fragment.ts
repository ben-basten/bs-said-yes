import { gql } from "graphql-request";

export const ACCORDION_FRAGMENT = gql`
  fragment Accordion on ModuleAccordion {
    heading
    copy {
      json
    }
    itemsCollection(limit: 15) {
      items {
        ... on ComponentTitleCopy {
          title
          copy {
            json
          }
        }
      }
    }
  }
`;

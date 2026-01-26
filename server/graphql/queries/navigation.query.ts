import { gql } from "graphql-request";
import { LINK_FRAGMENT } from "../fragments/link.fragment";

export const NAVIGATION_QUERY = gql`
  query Navigation {
    navigationCollection {
      items {
        navigationLinksCollection(limit: 10) {
          items {
            ...Link
          }
        }
        navigationCta {
          ...Link
        }
        footerCopy {
          json
        }
      }
    }
  }
  ${LINK_FRAGMENT}
`;

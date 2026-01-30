import { gql } from "graphql-request";

export const TEXT_CALLOUTS_FRAGMENT = gql`
  fragment TextCallouts on ModuleTextCallouts {
    heading
    calloutsCollection(limit: 10) {
      items {
        ... on ComponentTitleCopy {
          ...TitleCopy
        }
      }
    }
  }
`;

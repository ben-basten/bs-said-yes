import { gql } from "graphql-request";

export const CENTER_TEXT_FRAGMENT = gql`
  fragment CenterText on ModuleCenterText {
    heading
    text {
      json
      links {
        assets {
          block {
            sys {
              id
            }
            ...Image
          }
        }
      }
    }
  }
`;

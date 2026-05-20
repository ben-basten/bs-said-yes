import { gql } from "graphql-request";

export const TITLE_COPY_FRAGMENT = gql`
  fragment TitleCopy on ComponentTitleCopy {
    title
    copy {
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

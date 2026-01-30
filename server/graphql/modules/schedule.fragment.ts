import { gql } from "graphql-request";

export const SCHEDULE_FRAGMENT = gql`
  fragment Schedule on ModuleSchedule {
    heading
    copy {
      json
    }
    eventDate
    callToActionCollection(limit: 3) {
      items {
        ...Link
      }
    }
    eventsCollection(limit: 15) {
      items {
        ... on ComponentTitleCopy {
          ...TitleCopy
        }
      }
    }
  }
`;

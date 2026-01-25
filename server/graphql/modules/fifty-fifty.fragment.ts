import { gql } from "graphql-request";

export const FIFTY_FIFTY_FRAGMENT = gql`
  fragment FiftyFifty on ModuleFiftyfifty {
    heading
    copy {
      json
    }
    callToAction {
      ...Link
    }
    image {
      ...Image
    }
  }
`;

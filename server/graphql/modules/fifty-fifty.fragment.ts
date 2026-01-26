import { gql } from "graphql-request";

export const FIFTY_FIFTY_FRAGMENT = gql`
  fragment FiftyFifty on ModuleFiftyfifty {
    background
    eyebrow
    heading
    copy {
      json
    }
    callToAction {
      ...Link
    }
    secondaryCallToAction {
      ...Link
    }
    image {
      ...Image
    }
    imageAlignment
  }
`;

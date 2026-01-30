import { gql } from "graphql-request";

export const CALL_TO_ACTION_FRAGMENT = gql`
  fragment CallToAction on ModuleCallToAction {
    heading
    copy {
      json
    }
    callToAction {
      ...Link
    }
  }
`;

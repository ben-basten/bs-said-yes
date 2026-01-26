import { gql } from "graphql-request";

export const LINK_FRAGMENT = gql`
  fragment Link on ComponentLink {
    text
    url
    external
  }
`;

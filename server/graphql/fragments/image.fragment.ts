import { gql } from "graphql-request";

export const IMAGE_FRAGMENT = gql`
  fragment Image on Asset {
    url
    description
  }
`;

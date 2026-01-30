import { gql } from "graphql-request";

export const FORM_FRAGMENT = gql`
  fragment Form on ModuleForm {
    formType
  }
`;

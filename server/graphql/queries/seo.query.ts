import { gql } from "graphql-request";
import { SEO_FRAGMENT } from "../fragments/seo.fragment";

export const SEO_QUERY = gql`
  query SEO {
    componentSeo(id: "1j7SAAi0Di80JVqvW1QT67") {
      ...SEO
    }
  }
  ${SEO_FRAGMENT}
`;

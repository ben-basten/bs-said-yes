import type { PageStandardFragment } from "./graphql";

export type StandardApiResponse = {
  page: PageStandardFragment;
  preview: boolean;
};

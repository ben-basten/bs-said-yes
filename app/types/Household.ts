import type { InternalApi } from "nitropack";

export type Household =
  InternalApi["/api/admin/households/list"]["get"]["items"][number];

import type { InternalApi } from "nitropack";

type Household =
  InternalApi["/api/admin/households/list"]["get"]["items"][number];

export type { Household };

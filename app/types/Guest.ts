import type { InternalApi } from "nitropack";

export type AdminGuest =
  InternalApi["/api/admin/guests/list"]["get"]["guests"][number];

export type RsvpGuest = {
  id: string;
  displayName: string;
  attending: boolean | null;
  isAnonymous?: boolean;
};

export type Guest = {
  id: string;
  name: string | null;
  relationshipType?: string;
  attending: boolean | null;
};

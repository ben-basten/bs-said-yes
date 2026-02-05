export type Guest = {
  id: string;
  displayName: string;
  attending: boolean | null;
  isAnonymous?: boolean;
};

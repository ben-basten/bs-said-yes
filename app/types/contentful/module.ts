import type { EntryFieldTypes, EntrySkeletonType } from "contentful";

export type HomepageHeroSkeleton = EntrySkeletonType<
  {
    heading: EntryFieldTypes.Text;
  },
  "homepageHero"
>;

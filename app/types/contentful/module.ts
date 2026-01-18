import type { Entry, EntryFieldTypes, EntrySkeletonType } from "contentful";

export type ModuleProps<T extends EntrySkeletonType> = {
  data: Entry<T>;
};

export type HomepageHeroSkeleton = EntrySkeletonType<
  {
    heading: EntryFieldTypes.Text;
    copy: EntryFieldTypes.RichText;
  },
  "homepageHero"
>;

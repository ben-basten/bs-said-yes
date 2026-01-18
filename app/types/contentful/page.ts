import type { EntryFieldTypes, EntrySkeletonType } from "contentful";
import type { HomepageHeroSkeleton } from "./module";

/**
 * Union of all possible content module types
 */
export type ContentModuleSkeleton = HomepageHeroSkeleton;

/**
 * PageStandard content type skeleton
 */
export type PageStandard = EntrySkeletonType<
  {
    cmsName: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    contentModules: EntryFieldTypes.Array<
      EntryFieldTypes.EntryLink<ContentModuleSkeleton>
    >;
  },
  "pageStandard"
>;

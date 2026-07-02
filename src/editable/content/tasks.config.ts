import type { TaskKey } from "@/lib/site-config";

const SBM_KEY = ('s' + 'bm') as TaskKey;

export const slot4TaskSupport = {
  article: false,
  classified: false,
  [SBM_KEY]: true,
  profile: false,
  pdf: false,
  listing: true,
  image: false,
} as Record<TaskKey, boolean>;

export const slot4TaskNotes = {
  article: "Article pages and detail backlinks",
  classified: "Classified pages and detail backlinks",
  [SBM_KEY]: "Reads pages and detail backlinks",
  profile: "Profile/user pages",
  pdf: "PDF/document pages and detail backlinks",
  listing: "Places pages and detail backlinks",
  image: "Image/gallery pages and detail backlinks",
} as Record<TaskKey, string>;

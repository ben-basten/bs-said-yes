import { createClient } from "contentful";

const { cmsSpace, cmsApiKey, cmsEnv } = useRuntimeConfig();
export const cmsClient = createClient({
  space: cmsSpace,
  accessToken: cmsApiKey,
  environment: cmsEnv,
});

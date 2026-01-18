<template>
  <ContentContainer>
    <Heading as="h1">data: {{ content?.cmsName }}</Heading>
  </ContentContainer>
</template>

<script setup lang="ts">
import * as contentful from "contentful";
import type { ContentfulEntry } from "~/types/ContentfulEntry";
const { cmsSpace, cmsApiKey, cmsEnv } = useRuntimeConfig();
const { data } = useAsyncData("landing", async () => {
  const client = contentful.createClient({
    space: cmsSpace,
    accessToken: cmsApiKey,
    environment: cmsEnv,
  });
  return client.getEntries<
    ContentfulEntry<{
      cmsName: contentful.EntryFieldTypes.Text;
      slug: contentful.EntryFieldTypes.Text;
    }>
  >({
    content_type: "pageStandard",
    "fields.slug": "home",
    limit: 1,
  });
});
const content = computed(() => data.value?.items?.[0]?.fields);
</script>

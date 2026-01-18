<template>
  <ContentContainer>
    <Heading as="h1">data: {{ content?.cmsName }}</Heading>
  </ContentContainer>
</template>

<script setup lang="ts">
import * as contentful from "contentful";
import type { ContentfulEntry } from "~/types/ContentfulEntry";

const { slug } = defineProps<{ slug: string }>();

const { data } = useAsyncData(`route-${slug}`, async () => {
  const { cmsSpace, cmsApiKey, cmsEnv } = useRuntimeConfig();
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
    "fields.slug": slug,
    limit: 1,
  });
});
const content = computed(() => data.value?.items?.[0]?.fields);
</script>

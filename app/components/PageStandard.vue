<template>
  <ContentContainer>
    <Heading as="h1">data: {{ content?.cmsName }}</Heading>
    <ModuleRenderer
      v-for="(item, index) in content?.contentModules"
      :key="index"
      :data="item"
    />
  </ContentContainer>
</template>

<script setup lang="ts">
import { createClient } from "contentful";
import type { PageStandard } from "~/types/contentful/page";

const { slug } = defineProps<{ slug: string }>();

const { data } = useAsyncData(`route-${slug}`, async () => {
  const { cmsSpace, cmsApiKey, cmsEnv } = useRuntimeConfig();
  const client = createClient({
    space: cmsSpace,
    accessToken: cmsApiKey,
    environment: cmsEnv,
  });
  return client.withoutUnresolvableLinks.getEntries<PageStandard>({
    content_type: "pageStandard",
    "fields.slug": slug,
    limit: 1,
  });
});
const content = computed(() => data.value?.items?.[0]?.fields);
</script>

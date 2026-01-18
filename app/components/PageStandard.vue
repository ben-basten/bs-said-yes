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

const { data, error } = useAsyncData(`route-${slug}`, async () => {
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

if (error.value) {
  throw createError({
    statusCode: 500,
    statusMessage: "Something went wrong",
  });
}

if (data.value?.items.length === 0) {
  throw createError({
    statusCode: 404,
    statusMessage: "Not Found",
  });
}

const content = computed(() => data.value?.items?.[0]?.fields);
</script>

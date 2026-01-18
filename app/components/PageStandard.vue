<template>
  <ContentContainer>
    <Heading as="h1">data: {{ content?.cmsName }}</Heading>
    <ModuleRenderer
      v-for="(item, index) in contentModules"
      :key="index"
      :data="item"
    />
  </ContentContainer>
</template>

<script setup lang="ts">
import type { PageStandard } from "~/types/contentful/page";

const { slug } = defineProps<{ slug: string }>();

const { data, error } = useFetch<PageStandard>("/api/page/standard", {
  params: { slug },
});

if (error.value) {
  const statusCode = error.value.status || 500;
  throw createError({
    statusCode,
    statusMessage: statusCode === 404 ? "Not Found" : "Something went wrong",
  });
}

const content = computed(() => data.value?.fields);
const contentModules = computed(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  () => (content.value?.contentModules || []) as any[],
);
</script>

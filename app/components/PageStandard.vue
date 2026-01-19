<template>
  <ContentContainer>
    <Heading as="h1">{{ data?.cmsName }}</Heading>
    <ModuleRenderer
      v-for="(item, index) in contentModules"
      :key="index"
      :data="item"
    />
  </ContentContainer>
</template>

<script setup lang="ts">
import type { PageStandardFragment } from '~~/shared/types/graphql';

const { slug } = defineProps<{ slug: string }>();

const { data, error } = useFetch<PageStandardFragment>("/api/cms/standard", {
  params: { slug },
});

if (error.value) {
  const statusCode = error.value.statusCode || 500;
  throw createError({
    statusCode,
    statusMessage: statusCode === 404 ? "Not Found" : "Something went wrong",
  });
}

const contentModules = computed(
  () => (data.value?.contentModulesCollection?.items || []),
);
</script>

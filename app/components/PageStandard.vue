<template>
  <div>
    <ModuleRenderer
      v-for="(item, index) in contentModules"
      :key="index"
      :data="item"
    />
    <Memory />
  </div>
</template>

<script setup lang="ts">
import type { PageStandardFragment } from "~~/shared/types/graphql";

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

watch(
  data,
  () => {
    useHead({
      title: data.value?.seoTitle || undefined,
    });
  },
  { immediate: true },
);

const contentModules = computed(
  () => data.value?.contentModulesCollection?.items || [],
);
</script>

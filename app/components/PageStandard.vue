<template>
  <div>
    <ModuleRenderer
      v-for="(item, index) in contentModules"
      :key="index"
      :data="item"
    />
  </div>
  <div
    v-if="isPreview"
    class="p-4 bg-accent text-background fixed bottom-2 left-2"
  >
    Preview Mode
  </div>
</template>

<script setup lang="ts">
import type { StandardApiResponse } from "~~/shared/types/StandardApiResponse";

const { slug } = defineProps<{ slug: string }>();
const { query } = useRoute();

const { data, error } = useFetch<StandardApiResponse>("/api/cms/standard", {
  params: { slug },
  query: { preview: query.preview || undefined },
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
      title: data.value?.page?.seoTitle || undefined,
    });
  },
  { immediate: true },
);

const contentModules = computed(
  () => data.value?.page?.contentModulesCollection?.items || [],
);

const isPreview = computed(() => data.value?.preview || false);
</script>

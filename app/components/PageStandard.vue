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
import type { NuxtError } from "nuxt/app";
import type { PageStandardFragment } from "~~/shared/types/graphql";

const { slug } = defineProps<{ slug: string }>();
const { query } = useRoute();

const { data, error } = useFetch<PageStandardFragment>("/api/cms/standard", {
  params: { slug },
  query: {
    token: query.token || undefined,
  },
});

if (error.value) {
  const statusCode = (error.value as NuxtError).statusCode || 500;
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

const isPreview = computed(() => !!query.token || false);
</script>

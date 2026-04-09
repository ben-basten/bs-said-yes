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
    class="p-4 bg-action text-background fixed bottom-2 left-2"
  >
    Preview Mode
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "nuxt/app";
import type { PageStandardFragment } from "~~/shared/types/graphql";

const { slug } = defineProps<{ slug: string }>();
const { query, path } = useRoute();
const { clear } = useUserSession();

const { data, error } = await useFetch<PageStandardFragment>(
  "/api/cms/standard",
  {
    query: { slug, token: query.token || undefined },
  },
);

if (error.value) {
  const status = (error.value as NuxtError).status || 500;
  if (status === 401) {
    clear();
    await navigateTo({ path: "/login", query: { redirect: path } });
  } else {
    throw createError({
      status,
      statusMessage: status === 404 ? "Not Found" : "Something went wrong",
    });
  }
}

watch(
  data,
  () => {
    useSeoHead(data.value?.seoTitle || undefined);
  },
  { immediate: true },
);

const contentModules = computed(
  () => data.value?.contentModulesCollection?.items || [],
);

const isPreview = computed(() => !!query.token || false);
</script>

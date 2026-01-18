<template>
  <component :is="component" v-if="data && component" :data />
</template>

<script setup lang="ts">
import type { Entry } from "contentful";
import type { ContentModuleSkeleton } from "~/types/contentful/page";
import ModuleHomepageHero from "~/components/modules/HomepageHero.vue";
import type { Component } from "vue";

const { data } = defineProps<{
  data: Entry<ContentModuleSkeleton>;
}>();

const modules: Record<string, Component> = {
  homepageHero: ModuleHomepageHero,
};

const component = computed(() => {
  const typename = data.sys.contentType.sys.id;
  if (!typename) return null;
  return modules[typename] || null;
});
</script>

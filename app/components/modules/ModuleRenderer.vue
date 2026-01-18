<template>
  <component :is="component" v-if="data && component" :data />
</template>

<script setup lang="ts">
import ModuleHomepageHero from "./HomepageHero.vue";
import type { Component } from "vue";
import type { Entry } from "~~/shared/types/graphql";

const { data } = defineProps<{
  data: Entry | undefined;
}>();

const modules: Record<string, Component> = {
  homepageHero: ModuleHomepageHero,
};

const component = computed(() => {
  const typename = data?.__typename;
  if (!typename) return null;
  return modules[typename] || null;
});
</script>

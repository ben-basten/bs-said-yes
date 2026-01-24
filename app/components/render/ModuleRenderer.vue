<template>
  <component :is="component" v-if="data && component" :data />
</template>

<script setup lang="ts">
import ModuleHomepageHero from "~/components/modules/HomepageHero.vue";
import type { Component } from "vue";
import type { PageStandardFragment } from "~~/shared/types/graphql";

type ContentModules = NonNullable<
  PageStandardFragment["contentModulesCollection"]
>["items"][number];

const { data } = defineProps<{
  data: ContentModules;
}>();

const modules: Record<string, Component> = {
  HomepageHero: ModuleHomepageHero,
};

const component = computed(() => {
  const typename = data?.__typename;
  if (!typename) return null;
  return modules[typename] || null;
});
</script>

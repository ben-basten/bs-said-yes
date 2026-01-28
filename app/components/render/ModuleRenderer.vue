<template>
  <component :is="component" v-if="data && component" :data />
</template>

<script setup lang="ts">
import HomepageHero from "~/components/modules/HomepageHero.vue";
import FiftyFifty from "~/components/modules/FiftyFifty.vue";
import Accordion from "~/components/modules/Accordion.vue";
import Schedule from "~/components/modules/Schedule.vue";
import SimpleHero from "~/components/modules/SimpleHero.vue";
import type { Component } from "vue";
import type { PageStandardFragment } from "~~/shared/types/graphql";

type ContentModules = NonNullable<
  PageStandardFragment["contentModulesCollection"]
>["items"][number];

const { data } = defineProps<{
  data: ContentModules;
}>();

const modules: Record<string, Component> = {
  HomepageHero: HomepageHero,
  ModuleFiftyfifty: FiftyFifty,
  ModuleAccordion: Accordion,
  ModuleSchedule: Schedule,
  ModuleSimpleHero: SimpleHero,
};

const component = computed(() => {
  const typename = data?.__typename;
  if (!typename) return null;
  return modules[typename] || null;
});
</script>

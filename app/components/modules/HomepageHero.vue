<template>
  <p>{{ data.fields.heading }}</p>
</template>

<script setup lang="ts">
import type {
  HomepageHeroSkeleton,
  ModuleProps,
} from "~/types/contentful/module";

const { data } = defineProps<ModuleProps<HomepageHeroSkeleton>>();
</script>

<template>
  <section>
    <p>{{ data.fields.heading }}</p>
    <RichTextRenderer :json="data.fields.copy" />
  </section>
</template>

<script setup lang="ts">
import type {
  HomepageHeroSkeleton,
  ModuleProps,
} from "~/types/contentful/module";

const { data } = defineProps<ModuleProps<HomepageHeroSkeleton>>();
</script>

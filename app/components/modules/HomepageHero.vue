<template>
  <p>{{ data.fields.heading }}</p>
  <p>typeId: {{ data.sys.id }}</p>
</template>

<script setup lang="ts">
import type { Entry } from "contentful";
import type { HomepageHeroSkeleton } from "~/types/contentful/module";

const { data } = defineProps<{
  data: Entry<HomepageHeroSkeleton>;
}>();
</script>

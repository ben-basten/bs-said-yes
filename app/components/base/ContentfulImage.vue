<template>
  <NuxtImg provider="contentful" v-bind="props" />
</template>

<script setup lang="ts">
import { NuxtImg } from "#components";
const props = defineProps<{
  src: string;
  alt: string | undefined;
  sizes: string | undefined;
  quality?: number;
  fit?: "cover" | "contain" | "fill" | "inside" | "outside";
  format?: string;
  loading?: "eager" | "lazy";
}>();
</script>

<template>
  <NuxtImg
    provider="contentful"
    :src
    :alt
    :sizes
    :quality
    :fit
    :format
    :loading
  />
</template>

<script setup lang="ts">
import { NuxtImg } from "#components";
const {
  src,
  alt,
  sizes,
  quality = 80,
  fit = "fill",
  format = "avif",
  loading = "lazy",
} = defineProps<{
  src: string;
  alt: string | undefined;
  sizes: string | undefined;
  quality?: number;
  fit?: "cover" | "contain" | "fill" | "inside" | "outside";
  format?: string;
  loading?: "eager" | "lazy";
}>();
</script>

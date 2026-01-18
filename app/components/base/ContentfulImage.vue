<template>
  <NuxtImg provider="contentful" :src :alt :sizes :quality :fit :format />
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
} = defineProps<{
  src: string;
  alt: string | undefined;
  sizes: string | undefined;
  quality?: number;
  fit?: "cover" | "contain" | "fill" | "inside" | "outside";
  format?: string;
}>();
</script>

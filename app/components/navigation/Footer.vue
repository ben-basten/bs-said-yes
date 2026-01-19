<template>
  <footer class="text-center">
    <RichTextRenderer v-if="copy" :json="copy" />
  </footer>
</template>

<script setup lang="ts">
import type { Document } from "@contentful/rich-text-types";

defineProps<{
  copy: Document | null;
}>();
</script>

<template>
  <footer class="text-center mx-auto w-fit max-w-copy">
    <div class="divider mx-auto" />
    <RichTextRenderer v-if="copy" :json="copy" class="py-10" />
  </footer>
</template>

<script setup lang="ts">
import type { Document } from "@contentful/rich-text-types";

defineProps<{
  copy: Document | null;
}>();
</script>

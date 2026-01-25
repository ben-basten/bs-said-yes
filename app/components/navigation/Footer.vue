<template>
  <footer
    class="text-center py-10 mx-auto w-fit border-t-2 border-accent max-w-copy"
  >
    <RichTextRenderer v-if="copy" :json="copy" />
  </footer>
</template>

<script setup lang="ts">
import type { Document } from "@contentful/rich-text-types";

defineProps<{
  copy: Document | null;
}>();
</script>

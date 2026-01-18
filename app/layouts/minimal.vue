<template>
  <div class="min-h-screen flex flex-col">
    <slot />
  </div>
</template>

<script setup lang="ts">
useHead({
  meta: [{ name: "robots", content: "noindex, nofollow" }],
});
</script>

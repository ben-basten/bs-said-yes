<template>
  <div class="min-h-screen flex flex-col">
    <slot />
  </div>
</template>

<script setup lang="ts">
useHead({
  meta: [{ name: "robots", content: "noindex, nofollow" }],
  script: [
    {
      innerHTML: `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
  plausible.init()`,
    },
    {
      src: "https://plausible.io/js/pa-OHkrvpBKZCHL8K-dCydNm.js",
      async: true,
    },
  ],
});
</script>

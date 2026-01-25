<template>
  <component
    :is="as"
    data-name="container"
    class="px-side-mobile md:px-side mx-auto w-full max-w-max-width"
    :class="{
      'grid grid-cols-12 gap-x-0 md:gap-x-5': grid,
    }"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
const { as = "div", grid = false } = defineProps<{
  as?: "div" | "section";
  grid?: boolean;
}>();
</script>

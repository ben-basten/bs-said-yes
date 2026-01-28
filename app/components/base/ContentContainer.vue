<template>
  <component
    :is="as"
    data-name="container"
    class="mx-auto w-full max-w-max-width px-side-mobile md:px-side"
    :class="{
      'grid-12': grid,
      'mb-vertical md:mb-vertical-lg': margin,
    }"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
const {
  as = "div",
  grid = false,
  margin = false,
} = defineProps<{
  as?: "div" | "section";
  grid?: boolean;
  margin?: boolean;
}>();
</script>

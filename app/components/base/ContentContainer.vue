<template>
  <component
    :is="as"
    data-name="container"
    class="mx-auto w-full max-w-max-width"
    :class="{
      'grid-12': grid,
      'px-side-mobile md:px-side': padding === 'default',
      'px-0 md:px-side-sm': padding === 'sm',
    }"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
const {
  as = "div",
  grid = false,
  padding = "default",
} = defineProps<{
  as?: "div" | "section";
  grid?: boolean;
  padding?: "sm" | "default";
}>();
</script>

<template>
  <div class="sr-only focus-within:not-sr-only">
    <button
      type="button"
      class="button-sm fixed top-1.5 left-1.5 z-1000"
      @click="handleClick"
    >
      <slot />
    </button>
  </div>
</template>

<script setup lang="ts">
const { target = "main" } = defineProps<{
  target?: string;
}>();

const handleClick = () => {
  const element = document.querySelector<HTMLElement>(target);
  if (element) {
    element.focus();
  }
};
</script>

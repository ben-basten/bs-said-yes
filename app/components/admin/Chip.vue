<template>
  <span
    class="px-3 py-1 rounded-full text-xs font-semibold"
    :class="colorClass"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
const { color } = defineProps<{
  color: "green" | "red" | "yellow";
}>();

const colorClass = computed(() => {
  switch (color) {
    case "green":
      return "bg-green-500 text-foreground";
    case "red":
      return "bg-red-900 text-background";
    case "yellow":
      return "bg-yellow-500 text-foreground";
    default:
      return "";
  }
});
</script>

<template>
  <div
    class="absolute top-0 left-0 bg-accent h-2 w-full origin-left transition-transform duration-default ease-default"
    :style="`transform: scaleX(${currentStep / totalSteps})`"
  />
</template>

<script setup lang="ts">
defineProps<{
  currentStep: number;
  totalSteps: number;
}>();
</script>

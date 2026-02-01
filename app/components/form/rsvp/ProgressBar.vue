<template>
  <div
    class="absolute top-0 left-0 bg-accent h-2 w-full origin-left transition-transform duration-default ease-default"
    :style="`transform: scaleX(${currentStep / totalSteps})`"
  />
  <Heading as="p" variant="h4" class="absolute left-1/2 -translate-x-1/2 top-3">
    Step {{ currentStep }} of {{ totalSteps }}
  </Heading>
</template>

<script setup lang="ts">
defineProps<{
  currentStep: number;
  totalSteps: number;
}>();
</script>

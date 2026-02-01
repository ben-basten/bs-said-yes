<template>
  <div aria-live="polite" aria-atomic="true">
    <div
      class="absolute top-0 left-0 bg-accent h-2 w-full origin-left transition-transform duration-default ease-default"
      :style="`transform: scaleX(${currentStep / totalSteps})`"
    />
    <Heading
      as="p"
      variant="h4"
      class="absolute left-1/2 -translate-x-1/2 top-3"
    >
      {{ message }}
    </Heading>
  </div>
</template>

<script setup lang="ts">
const { currentStep, totalSteps } = defineProps<{
  currentStep: number;
  totalSteps: number;
}>();

const message = computed(() => {
  if (currentStep === totalSteps) {
    return "Complete 🎉";
  }
  return `Step ${currentStep} of ${totalSteps - 1}`;
});
</script>

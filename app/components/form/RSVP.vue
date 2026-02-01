<template>
  <ContentContainer margin>
    <div
      class="relative bg-secondary rounded-lg overflow-hidden px-10 pb-10 pt-15 max-w-160 mx-auto w-full"
    >
      <ProgressBar :current-step="current" :total-steps="4" />
      <StepLookup />
      <!-- <StepHousehold /> -->
    </div>
  </ContentContainer>
</template>

<script setup lang="ts">
const current = ref(1);
</script>

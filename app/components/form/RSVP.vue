<template>
  <ContentContainer margin>
    <div
      class="relative bg-secondary rounded-lg overflow-hidden px-10 pb-10 pt-15 max-w-160 mx-auto w-full"
    >
      <ProgressBar :current-step="rsvpStore.currentStep" :total-steps="5" />
      <StepLookup v-if="rsvpStore.currentStep === 1" />
      <StepHousehold v-if="rsvpStore.currentStep === 2" />
      <StepAccommodations v-if="rsvpStore.currentStep === 3" />
      <StepSongRecommendation v-if="rsvpStore.currentStep === 4" />
      <SubmissionMessage v-if="rsvpStore.currentStep === 5" />
    </div>
  </ContentContainer>
</template>

<script setup lang="ts">
const rsvpStore = useRsvpStore();
</script>

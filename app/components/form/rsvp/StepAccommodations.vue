<template>
  <StepContainer
    heading="Accommodations"
    description="Are there any dietary or other accommodations we should be aware of? The dinner taco bar will include vegetarian, gluten-free, and vegan options."
    primary-text="Next"
    secondary-text="Previous"
    @submit.prevent="rsvpStore.nextStep()"
    @secondary="rsvpStore.previousStep()"
  >
    <FormTextarea
      v-model="rsvpStore.accommodations"
      label="Additional accommodations (optional)"
      name="accommodations"
      placeholder="E.g., vegetarian, gluten-free, accessibility needs, etc."
      rows="4"
    />
  </StepContainer>
</template>

<script setup lang="ts">
const rsvpStore = useRsvpStore();
</script>

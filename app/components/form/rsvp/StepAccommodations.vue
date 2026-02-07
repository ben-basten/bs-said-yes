<template>
  <StepContainer
    heading="Accommodations"
    description="Are there any dietary, accessibility, or other accommodations we should be aware of? Dinner will include vegetarian, gluten-free, and vegan options."
    primary-text="Next"
    secondary-text="Previous"
    @submit.prevent="rsvpStore.nextStep()"
    @secondary="rsvpStore.previousStep()"
  >
    <FormTextarea
      v-model="rsvpStore.accommodations"
      :label
      name="accommodations"
      placeholder="E.g., vegetarian, gluten-free, accessibility needs, etc."
      rows="4"
      :maxlength="1000"
    />
  </StepContainer>
</template>

<script setup lang="ts">
const rsvpStore = useRsvpStore();

const label = computed(() => {
  const count = rsvpStore.attendingIds.length;
  if (count === 1) {
    return "Additional accommodations (optional)";
  }
  return "Additional accommodations for you and your party (optional)";
});
</script>

<template>
  <StepContainer
    heading="Look up your RSVP"
    description="Please enter the first and last name of one member of your party below. If you're responding for you and a guest (or your family), you'll be able to RSVP for your entire group on the next step."
    primary-text="Search"
    @submit.prevent="handleSubmit"
  >
    <FormInput label="First and Last Name" name="name" required />
  </StepContainer>
</template>

<script setup lang="ts">
const rsvpStore = useRsvpStore();
const handleSubmit = (_: SubmitEvent) => {
  rsvpStore.nextStep();
};
</script>

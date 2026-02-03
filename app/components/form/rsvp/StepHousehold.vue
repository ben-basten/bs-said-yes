<template>
  <StepContainer
    heading="Who will be attending?"
    description="Select all members of your party who will be attending the wedding."
    :primary-text="rsvpStore.isAttending() ? 'Next' : 'Submit'"
    secondary-text="Previous"
    @submit.prevent="handleSubmit"
    @secondary="rsvpStore.reset()"
  >
    <fieldset class="flex flex-col gap-y-4">
      <FormCheckbox
        v-model="rsvpStore.attendingIds"
        :label="rsvpStore.self?.name || ''"
        :value="rsvpStore.self?.id || ''"
        name="attending"
      />
      <!-- TODO: handle unknown names -->
      <FormCheckbox
        v-for="member in rsvpStore.guests"
        :key="member.id"
        v-model="rsvpStore.attendingIds"
        :label="member.name || 'Unknown'"
        :value="member.id"
        name="attending"
      />
    </fieldset>
  </StepContainer>
</template>

<script setup lang="ts">
const rsvpStore = useRsvpStore();

const handleSubmit = () => {
  if (!rsvpStore.isAttending()) {
    rsvpStore.toEnd();
    return;
  }
  rsvpStore.nextStep();
};
</script>

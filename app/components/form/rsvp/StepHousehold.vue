<template>
  <StepContainer
    heading="Who will be attending?"
    description="Select all members of your party who will be attending the wedding."
    :primary-text="rsvpStore.isAttending() ? 'Next' : 'Submit'"
    secondary-text="Previous"
    :disabled="isLoading"
    @submit.prevent="handleSubmit"
    @secondary="rsvpStore.reset()"
  >
    <fieldset class="flex flex-col gap-y-4">
      <FormCheckbox
        v-if="rsvpStore.self"
        v-model="rsvpStore.attendingIds"
        :label="rsvpStore.self.name"
        :value="rsvpStore.self.id"
        name="attending"
      />
      <FormCheckbox
        v-for="member in rsvpStore.guests"
        :key="member.id"
        v-model="rsvpStore.attendingIds"
        :label="member.name"
        :value="member.id"
        name="attending"
      />
    </fieldset>
  </StepContainer>
</template>

<script setup lang="ts">
const rsvpStore = useRsvpStore();
const isLoading = ref(false);

const handleSubmit = async () => {
  if (isLoading.value) return;

  if (!rsvpStore.isAttending()) {
    isLoading.value = true;
    submitRsvp({
      mainGuestId: rsvpStore.self?.id,
      attendingGuestIds: [],
      accommodations: null,
      songRecommendations: null,
    })
      .then(() => {
        rsvpStore.toEnd();
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.error("StepHousehold: Failed to submit RSVP for no attendees.");
      })
      .finally(() => {
        isLoading.value = false;
      });
    return;
  }

  rsvpStore.nextStep();
};
</script>

<template>
  <StepContainer
    heading="Will you be attending?"
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
        :label="rsvpStore.self.displayName"
        :value="rsvpStore.self.id"
        name="attending"
      />
      <FormCheckbox
        v-for="guest in rsvpStore.guests"
        :key="guest.id"
        v-model="rsvpStore.attendingIds"
        :label="guest.displayName"
        :value="guest.id"
        name="attending"
      />
    </fieldset>
    <FormInput
      v-if="rsvpStore.anonymousGuest"
      v-model="rsvpStore.plusOneName"
      label="Who's joining you? Include their first and last name."
      name="plus-one"
      placeholder="ex. John Doe"
      required
      :maxlength="255"
    />
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
      mainGuestId: rsvpStore.self.id,
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

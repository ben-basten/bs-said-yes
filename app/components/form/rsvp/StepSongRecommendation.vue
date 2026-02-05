<template>
  <StepContainer
    heading="Music Recommendations"
    description="Got a favorite song, artist, or genre you'd love to hear at the wedding? Let us know!"
    primary-text="Submit"
    secondary-text="Previous"
    :disabled="isLoading"
    @submit.prevent="handleSubmit"
    @secondary="rsvpStore.previousStep()"
  >
    <FormTextarea
      v-model="rsvpStore.songRequests"
      label="Recommendation (optional)"
      name="song-recommendations"
      placeholder="E.g., your favorite song, artist, genre, etc."
      rows="4"
      :maxlength="1000"
    />
  </StepContainer>
</template>

<script setup lang="ts">
const rsvpStore = useRsvpStore();
const isLoading = ref(false);

const handleSubmit = async () => {
  if (isLoading.value) return;

  isLoading.value = true;
  submitRsvp({
    mainGuestId: rsvpStore.self?.id,
    attendingGuestIds: rsvpStore.attendingIds,
    accommodations: rsvpStore.accommodations,
    songRecommendations: rsvpStore.songRequests,
    plusOne: rsvpStore.anonymousGuest
      ? {
          id: rsvpStore.anonymousGuest.id,
          name: rsvpStore.plusOneName,
        }
      : undefined,
  })
    .then(() => {
      rsvpStore.toEnd();
    })
    .catch(() => {
      // eslint-disable-next-line no-console
      console.error(
        "StepSongRecommendation: Failed to submit RSVP attendance.",
      );
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>

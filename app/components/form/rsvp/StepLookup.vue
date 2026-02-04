<template>
  <StepContainer
    heading="Look up your RSVP"
    description="Please enter the first and last name of one member of your party below. If you're responding for you and a guest (or your family), you'll be able to RSVP for your entire group on the next step."
    primary-text="Search"
    :disabled="isLoading"
    @submit.prevent="handleSubmit"
  >
    <FormInput
      label="First and Last Name"
      name="name"
      required
      :maxlength="255"
      :error="errorMessage"
    />
  </StepContainer>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

const rsvpStore = useRsvpStore();
const errorMessage = ref<string | undefined>(undefined);
const isLoading = ref(false);

const handleSubmit = async (event: SubmitEvent) => {
  if (isLoading.value) return;

  isLoading.value = true;
  errorMessage.value = undefined;
  const formData = new FormData(event.target as HTMLFormElement);
  const name = (formData.get("name") as string).trim();

  $fetch("/api/rsvp/lookup", {
    method: "GET",
    query: { name },
  })
    .then((res) => {
      rsvpStore.setLookupResponse(res);
      rsvpStore.nextStep();
    })
    .catch((error) => {
      const nuxtError = error as NuxtError;
      if (nuxtError?.status === 404) {
        errorMessage.value = "No matching guest found.";
      } else {
        errorMessage.value = "An unknown error occurred. Please try again.";
      }
    })
    .finally(() => {
      isLoading.value = false;
    });
};
</script>

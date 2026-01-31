<template>
  <StepContainer
    heading="Look up your RSVP"
    description="Please enter the first and last name of one member of your party below. If you're responding for you and a guest (or your family), you'll be able to RSVP for your entire group on the next step."
    primary-text="Search"
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
const rsvpStore = useRsvpStore();
const errorMessage = ref<string | undefined>(undefined);

const handleSubmit = async (event: SubmitEvent) => {
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
      if (error?.status === 404) {
        errorMessage.value = "No matching guest found.";
      } else {
        errorMessage.value = "An unknown error occurred. Please try again.";
      }
    });
};
</script>

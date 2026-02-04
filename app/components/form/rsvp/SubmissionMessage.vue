<template>
  <div class="flex flex-col gap-y-7 py-20 text-center items-center">
    <Heading :id="headingId" as="h2" :tabindex="-1" class="outline-none">
      Thank you for your RSVP!
    </Heading>
    <p class="max-w-copy">
      {{ message }}
    </p>
    <button
      type="button"
      class="button button-md"
      @click="rsvpStore.toBeginning()"
    >
      Edit response
    </button>
  </div>
</template>

<script setup lang="ts">
const headingId = useId();
const rsvpStore = useRsvpStore();

onMounted(() => {
  document.getElementById(headingId)?.focus();
});

const message = computed(() => {
  if (rsvpStore.isAttending()) {
    return "We can't wait to celebrate with you on our special day!";
  } else {
    return "We're sorry to hear that you won't be able to join us.";
  }
});
</script>

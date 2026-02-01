<template>
  <div class="flex flex-col gap-y-7 py-20 text-center items-center">
    <Heading :id="headingId" as="h2" :tabindex="-1" class="outline-none"
      >Thank you for your RSVP!</Heading
    >
    <p class="max-w-copy">
      We appreciate you taking the time to let us know about your attendance. We
      can't wait to celebrate with you on our special day!
    </p>
  </div>
</template>

<script setup lang="ts">
const headingId = useId();

onMounted(() => {
  document.getElementById(headingId)?.focus();
});
</script>

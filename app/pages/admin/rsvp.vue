<template>
  <ContentContainer class="mt-10 mb-vertical-lg">
    <Heading as="h1" variant="h2" class="mb-6 text-center">
      Manage RSVPs
    </Heading>
    <RSVP />
  </ContentContainer>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "authenticated",
  layout: "admin",
});

useHead({
  title: "RSVP | Admin",
});
</script>

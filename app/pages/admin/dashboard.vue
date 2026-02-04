<template>
  <ContentContainer class="mt-10 mb-vertical-lg">
    <Heading as="h1" variant="h2" class="mb-6">Manage Guests</Heading>

    <StatusCards
      :attending="statusData?.status?.attending ?? null"
      :not-attending="statusData?.status?.notAttending ?? null"
      :not-responded="statusData?.status?.notResponded ?? null"
      class="mb-10"
    />

    <GuestList />
  </ContentContainer>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "authenticated",
  layout: "admin",
});

useHead({
  title: "Dashboard | Admin",
});

const { data: statusData } = await useFetch("/api/admin/guests/status");
</script>

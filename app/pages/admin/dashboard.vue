<template>
  <ContentContainer class="mt-10">
    <Heading as="h1" variant="h2" class="mb-6">Manage Guests</Heading>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        class="bg-green-100 dark:bg-green-900 rounded-lg p-6 border-l-4 border-green-500"
      >
        <p class="text-white type-eyebrow">Attending</p>
        <p class="text-4xl font-bold text-white mt-2">
          {{ data?.status?.attending ?? 0 }}
        </p>
      </div>
      <div
        class="bg-red-100 dark:bg-red-900 rounded-lg p-6 border-l-4 border-red-500"
      >
        <p class="text-white type-eyebrow">Not Attending</p>
        <p class="text-4xl font-bold text-white mt-2">
          {{ data?.status?.notAttending ?? 0 }}
        </p>
      </div>
      <div
        class="bg-yellow-100 dark:bg-yellow-900 rounded-lg p-6 border-l-4 border-yellow-500"
      >
        <p class="text-white type-eyebrow">Not Responded</p>
        <p class="text-4xl font-bold text-white mt-2">
          {{ data?.status?.notResponded ?? 0 }}
        </p>
      </div>
    </div>
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

const { data } = await useFetch("/api/admin/guests/status");
</script>

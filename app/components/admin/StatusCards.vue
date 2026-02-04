<template>
  <div>
    <Heading as="h2" variant="h3" class="mb-5">Attendance Status</Heading>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
      <div
        v-if="attending !== null"
        class="bg-green-900 rounded-lg p-6 border-l-4 border-green-500"
      >
        <p class="type-eyebrow">Attending</p>
        <p class="text-4xl font-bold mt-2">
          {{ attending }}
        </p>
      </div>
      <div
        v-if="notAttending !== null"
        class="bg-red-900 rounded-lg p-6 border-l-4 border-red-500"
      >
        <p class="type-eyebrow">Not Attending</p>
        <p class="text-4xl font-bold mt-2">
          {{ notAttending }}
        </p>
      </div>
      <div
        v-if="notResponded !== null"
        class="bg-yellow-900 rounded-lg p-6 border-l-4 border-yellow-500"
      >
        <p class="type-eyebrow">Not Responded</p>
        <p class="text-4xl font-bold mt-2">
          {{ notResponded }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  attending: number | null;
  notAttending: number | null;
  notResponded: number | null;
}>();
</script>

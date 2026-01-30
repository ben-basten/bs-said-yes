<template>
  <ContentContainer margin class="mt-10">
    <Heading as="h1" class="mb-vertical">Memory Submissions</Heading>
    <div v-for="item in data?.memories" :key="item.id">
      <div class="bg-secondary rounded-lg p-6 mb-4">
        <h3 class="font-medium text-lg mb-2">{{ item.title }}</h3>
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
  title: "Memories | Admin",
});

const { data } = useFetch("/api/admin/memories");
</script>

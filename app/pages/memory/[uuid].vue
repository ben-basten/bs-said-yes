<template>
  <ContentContainer margin class="mt-nav-height nav:mt-10 lg:mt-20">
    <div class="max-w-3xl mx-auto">
      <div class="mb-10 text-center">
        <Heading as="h1" class="mb-4">{{ data?.title }}</Heading>
        <p class="type-body">Shared by: {{ data?.author }}</p>
      </div>

      <div
        class="bg-secondary rounded-xl p-8 md:p-14 shadow-sm border border-black/5"
      >
        <p class="type-body">
          {{ data?.story }}
        </p>
      </div>
    </div>
  </ContentContainer>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "authenticated",
});

const route = useRoute();
const uuid = route.params.uuid as string;

const { data } = await useFetch(`/api/memory/${uuid}`);

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: "Memory not found" });
}

useHead({
  title: data.value ? `${data.value.title} | Memory` : "Memory",
});
</script>

<template>
  <ContentContainer margin class="mt-10 lg:mt-20">
    <div v-if="pending" class="flex justify-center py-20">
      <p class="text-lg animate-pulse">Loading memory...</p>
    </div>

    <div v-else-if="error" class="text-center py-20 bg-secondary rounded-2xl">
      <Heading as="h1" variant="h2">Memory not found</Heading>
      <p class="type-body mt-4">
        The memory you are looking for does not exist or you don't have access
        to it.
      </p>
      <NuxtLink
        to="/"
        class="inline-block mt-8 text-action font-bold hover:underline"
      >
        Go back home
      </NuxtLink>
    </div>

    <div v-else-if="data" class="max-w-3xl mx-auto">
      <div class="mb-10 text-center">
        <Heading as="h1" class="mb-4">{{ data.title }}</Heading>
        <p class="type-body text-gray-600">
          Shared by {{ data.author || "Anonymous" }}
        </p>
      </div>

      <div
        class="bg-secondary rounded-xl p-8 md:p-14 shadow-sm border border-black/5"
      >
        <p class="type-body whitespace-pre-wrap leading-relaxed">
          &ldquo;{{ data.story }}&rdquo;
        </p>
      </div>

      <div class="mt-16 text-center">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-3 text-action font-bold hover:gap-4 transition-all"
        >
          <div class="rotate-180">
            <IconArrowForward class="size-5" />
          </div>
          Back to home
        </NuxtLink>
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

const { data, pending, error } = await useFetch(`/api/memory/${uuid}`);

useHead({
  title: data.value ? `${data.value.title} | Memory` : "Memory",
});
</script>

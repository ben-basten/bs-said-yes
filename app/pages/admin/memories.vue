<template>
  <ContentContainer margin class="mt-10">
    <div
      class="flex flex-col gap-5 items-center text-center justify-between md:flex-row mb-vertical"
    >
      <Heading as="h1">Memory Submissions</Heading>
      <div v-if="data" class="text-sm font-medium">Total: {{ data.total }}</div>
    </div>

    <div v-if="data?.memories?.length" class="grid gap-4">
      <InlineLink
        v-for="item in data.memories"
        :key="item.id"
        :href="`/memory/${item.id}`"
        class="text-foreground no-underline hover:text-foreground bg-secondary rounded-2xl p-6 transition-all cursor-pointer group"
      >
        <div class="flex items-center justify-between gap-4 w-full">
          <div>
            <h3 class="font-bold text-xl leading-tight mb-1">
              {{ item.title }}
            </h3>
            <p v-if="item.author" class="text-sm">{{ item.author }}</p>
            <p v-else class="text-sm">Anonymous</p>
          </div>
          <div
            class="size-10 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <IconArrowForward class="size-5" />
          </div>
        </div>
      </InlineLink>
    </div>
    <div
      v-else-if="status !== 'pending'"
      class="text-center py-20 bg-secondary rounded-2xl"
    >
      <p class="text-lg">No memories submitted yet.</p>
    </div>

    <!-- Pagination -->
    <div
      v-if="totalPages > 1"
      class="mt-12 flex items-center justify-center gap-6"
    >
      <IconButton
        label="Previous Page"
        :disabled="page === 1"
        class="disabled:opacity-20 disabled:cursor-not-allowed text-white bg-action hover:bg-action/80"
        @click="paginate(-1)"
      >
        <div class="rotate-180">
          <IconArrowForward class="size-6" />
        </div>
      </IconButton>

      <div class="font-bold text-lg min-w-32 text-center">
        {{ page }} <span class="mx-2">/</span> {{ totalPages }}
      </div>

      <IconButton
        label="Next Page"
        :disabled="page === totalPages"
        class="disabled:opacity-20 disabled:cursor-not-allowed text-white bg-action hover:bg-action/80"
        @click="paginate(1)"
      >
        <IconArrowForward class="size-6" />
      </IconButton>
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

const route = useRoute();
const page = computed(() => Number(route.query.page) || 1);
const limit = 20;

const paginate = (direction: 1 | -1) => {
  const newPage = page.value + direction;
  if (newPage < 1 || (totalPages.value > 0 && newPage > totalPages.value)) {
    return;
  }
  navigateTo({ query: { ...route.query, page: newPage } });
};

const { data, status } = useFetch("/api/admin/memories", {
  query: {
    page,
    limit,
  },
});

const totalPages = computed(() => {
  if (!data.value) return 0;
  return Math.ceil(data.value.total / limit);
});
</script>

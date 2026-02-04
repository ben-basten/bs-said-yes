<template>
  <ContentContainer margin class="mt-10">
    <div
      class="flex flex-col gap-5 items-center text-center justify-between md:flex-row mb-vertical"
    >
      <Heading as="h1">Memory Submissions</Heading>
      <div v-if="data" class="text-sm font-medium">Total: {{ data.total }}</div>
    </div>

    <div v-if="data?.memories?.length" class="grid gap-4">
      <button
        v-for="item in data.memories"
        :key="item.id"
        type="button"
        class="text-left bg-secondary rounded-2xl p-6 transition-all cursor-pointer group"
        @click="openMemory(item)"
      >
        <div class="flex items-center justify-between gap-4">
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
      </button>
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
        @click="page--"
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
        @click="page++"
      >
        <IconArrowForward class="size-6" />
      </IconButton>
    </div>

    <!-- Memory Detail Modal -->
    <Modal v-model:open="isModalOpen" :title="selectedMemory?.title">
      <Heading as="h2" variant="h4">
        Shared by:
        {{ selectedMemory?.author ? selectedMemory.author : "Anonymous" }}
      </Heading>
      <p class="type-body">
        {{ selectedMemory?.story }}
      </p>
    </Modal>
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

const page = ref(1);
const limit = 10;

interface Memory {
  id: number;
  title: string;
  author: string | null;
  story: string;
}

const { data, status } = useFetch("/api/admin/memories", {
  query: {
    page,
    limit,
  },
  watch: [page],
});

const totalPages = computed(() => {
  if (!data.value) return 0;
  return Math.ceil(data.value.total / limit);
});

const isModalOpen = ref(false);
const selectedMemory = ref<Memory | null>(null);

const openMemory = (memory: Memory) => {
  selectedMemory.value = memory;
  isModalOpen.value = true;
};
</script>

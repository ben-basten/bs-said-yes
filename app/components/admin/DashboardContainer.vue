<template>
  <section class="bg-background border border-slate rounded-lg">
    <div
      class="p-6 border-b border-slate flex items-center justify-between gap-5 flex-wrap"
    >
      <div>
        <Heading as="h2" variant="h4">{{ title }}</Heading>
        <p v-if="subtitle" class="text-sm text-slate mt-1">
          {{ subtitle }}
        </p>
      </div>
      <div v-if="$slots.actions">
        <slot name="actions" />
      </div>
    </div>

    <slot />

    <div
      v-if="pagination"
      class="px-6 py-4 border-t border-slate flex items-center justify-between"
    >
      <button
        :disabled="pagination.page <= 1"
        type="button"
        class="px-4 py-2 text-sm font-medium text-foreground bg-background border border-slate rounded-lg hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        @click="$emit('previous')"
      >
        Previous
      </button>
      <span v-if="pagination.totalPages > 0" class="text-sm text-slate">
        Page {{ pagination.page }} of {{ pagination.totalPages }}
      </span>
      <button
        :disabled="pagination.page >= pagination.totalPages"
        type="button"
        class="px-4 py-2 text-sm font-medium text-foreground bg-background border border-slate rounded-lg hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        @click="$emit('next')"
      >
        Next
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Pagination } from "~~/shared/types/Pagination";

defineProps<{
  title: string;
  subtitle?: string;
  pagination?: Pagination;
}>();

defineEmits<{
  (e: "next" | "previous"): void;
}>();
</script>

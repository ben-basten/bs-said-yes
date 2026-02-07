<template>
  <section class="bg-background border border-slate rounded-lg">
    <div class="p-6 border-b border-slate">
      <Heading
        :id="headingId"
        as="h2"
        variant="h4"
        :tabindex="-1"
        class="outline-none"
      >
        {{ title }}
      </Heading>
      <p v-if="subtitle" class="text-sm text-slate mt-1">
        {{ subtitle }}
      </p>
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
      <span class="text-sm text-slate">
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
const headingId = useId();

defineProps<{
  title: string;
  subtitle?: string;
  pagination?: {
    page: number;
    totalPages: number;
  };
}>();

defineEmits<{
  (e: "next" | "previous"): void;
}>();

onMounted(() => {
  document.getElementById(headingId)?.focus();
});
</script>

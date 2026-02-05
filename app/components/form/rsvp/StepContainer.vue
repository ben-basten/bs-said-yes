<template>
  <form @submit.prevent="$emit('submit', $event)">
    <div class="flex flex-col gap-y-7">
      <Heading :id="headingId" as="h2" :tabindex="-1" class="outline-none">
        {{ heading }}
      </Heading>
      <p class="max-w-copy">{{ description }}</p>
      <slot />
    </div>
    <div class="text-sm font-semibold text-error" aria-live="polite">
      <span v-if="error" class="mt-3 block">{{ error }}</span>
    </div>
    <div
      class="flex gap-x-5 flex-row-reverse mt-7"
      :class="{
        'justify-start': !secondaryText,
        'justify-between': secondaryText,
      }"
    >
      <button type="submit" class="button button-md" :disabled>
        {{ primaryText }}
      </button>
      <button
        v-if="secondaryText"
        type="button"
        class="button-secondary button-md"
        @click="$emit('secondary')"
      >
        {{ secondaryText }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
const headingId = useId();

defineProps<{
  heading: string;
  description: string;
  primaryText: string;
  secondaryText?: string;
  disabled?: boolean;
  error?: string;
}>();

defineEmits<{
  (e: "secondary"): void;
  (e: "submit", event: SubmitEvent): void;
}>();

onMounted(() => {
  document.getElementById(headingId)?.focus();
});
</script>

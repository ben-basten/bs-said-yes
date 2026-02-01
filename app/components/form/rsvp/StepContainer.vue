<template>
  <div class="flex flex-col gap-y-7">
    <Heading as="h2">{{ heading }}</Heading>
    <p class="max-w-copy">{{ description }}</p>
    <slot />
    <div
      class="flex gap-x-5"
      :class="{
        'justify-end': !secondaryText,
        'justify-between': secondaryText,
      }"
    >
      <button
        v-if="secondaryText"
        type="button"
        class="button-secondary button-md"
      >
        {{ secondaryText }}
      </button>
      <button type="button" class="button button-md">
        {{ primaryText }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  heading: string;
  description: string;
  primaryText: string;
  secondaryText?: string;
}>();

defineEmits<{
  (e: "primaryClick" | "secondaryClick"): void;
}>();
</script>

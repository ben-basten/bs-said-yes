<template>
  <form class="flex flex-col gap-y-7" @submit.prevent="$emit('submit', $event)">
    <Heading :id="headingId" as="h2" :tabindex="-1" class="outline-none">
      {{ heading }}
    </Heading>
    <p class="max-w-copy">{{ description }}</p>
    <slot />
    <div
      class="flex gap-x-5 flex-row-reverse"
      :class="{
        'justify-start': !secondaryText,
        'justify-between': secondaryText,
      }"
    >
      <button type="submit" class="button button-md">
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
}>();

defineEmits<{
  (e: "secondary"): void;
  (e: "submit", event: SubmitEvent): void;
}>();

onMounted(() => {
  document.getElementById(headingId)?.focus();
});
</script>

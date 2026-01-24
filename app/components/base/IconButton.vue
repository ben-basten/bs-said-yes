<template>
  <button type="button" class="cursor-pointer rounded-full p-2" :aria-label="label" :title="label"
    @click="$emit('click')">
    <slot aria-hidden />
  </button>
</template>

<script setup lang="ts">
const { label } = defineProps<{
  label: string;
}>();

defineEmits<{
  (e: 'click'): void;
}>();
</script>

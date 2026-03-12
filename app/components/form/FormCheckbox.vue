<template>
  <div class="flex items-center gap-3">
    <input
      :id="inputId"
      v-model="model"
      type="checkbox"
      :name="name"
      :value="value"
      class="size-5 rounded border-2 border-foreground accent-accent cursor-pointer"
    />
    <label
      :for="inputId"
      class="text-lg font-semibold cursor-pointer select-none"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  value?: string;
  name?: string;
}>();

const model = defineModel<boolean | string[]>();

const fallbackId = useId();
const inputId = computed(() =>
  props.value !== undefined ? props.value : fallbackId,
);
</script>

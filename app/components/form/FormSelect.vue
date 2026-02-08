<template>
  <div class="flex flex-col">
    <label :for="id" class="text-lg font-semibold">
      {{ label }}
    </label>
    <div class="relative">
      <select
        :id
        v-model="model"
        class="w-full px-4 py-2 bg-background border-2 border-foreground rounded-xl appearance-none"
        :required
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <span class="absolute top-1/2 -translate-y-1/2 right-5"> &#9662; </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string>();
const id = useId();

defineProps<{
  label: string;
  options: { label: string; value: string }[];
  required?: boolean;
}>();
</script>

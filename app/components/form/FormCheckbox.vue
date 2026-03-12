<template>
  <div class="flex items-center gap-3">
    <input
      :id
      v-model="model"
      type="checkbox"
      :name
      :value
      class="size-5 rounded border-2 border-foreground accent-accent cursor-pointer"
    />
    <label :for="id" class="text-lg font-semibold cursor-pointer select-none">
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<boolean | string[]>();
const id = useId();

const { label, name, value } = defineProps<{
  label: string;
  name?: string;
  value?: string;
}>();
</script>

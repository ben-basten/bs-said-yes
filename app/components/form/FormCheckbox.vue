<template>
  <div class="flex items-center gap-3">
    <input
      :id
      v-model="model"
      type="checkbox"
      class="size-5 rounded border-2 border-foreground accent-accent cursor-pointer"
    />
    <label :for="id" class="text-lg font-semibold cursor-pointer">
      {{ label }}
    </label>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<boolean>();
const id = useId();

const { label } = defineProps<{
  label: string;
}>();
</script>

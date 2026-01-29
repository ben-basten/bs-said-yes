<template>
  <div class="flex flex-col">
    <label :for="id" class="text-lg font-semibold">{{ label }}</label>
    <textarea
      :id
      ref="textareaRef"
      v-model="model"
      v-bind="rest"
      class="bg-background border-2 border-foreground user-invalid:border-error rounded-xl px-4 py-2"
    />
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string>();
const id = useId();
const textareaRef = ref<HTMLTextAreaElement | null>(null);

const { label, ...rest } = defineProps<{
  label: string;
  name: string;
  rows?: number | string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}>();

defineExpose({
  textareaRef,
});
</script>

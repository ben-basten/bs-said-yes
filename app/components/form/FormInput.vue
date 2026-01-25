<template>
  <div class="flex flex-col">
    <label :for="id">{{ label }}</label>
    <input
      :id
      ref="inputRef"
      v-model="model"
      :type
      :name
      :placeholder
      :autocomplete
      :autofocus
      :disabled
      :required
      class="bg-background border-2 border-foreground user-invalid:border-error rounded-xl px-4 py-2"
    />
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string>();
const id = useId();
const inputRef = ref<HTMLInputElement | null>(null);

const { type = "text" } = defineProps<{
  type?: "password" | "text" | "email";
  placeholder?: string;
  autocomplete?: string;
  autofocus?: boolean;
  disabled?: boolean;
  required?: boolean;
  label: string;
  name: string;
}>();

defineExpose({
  inputRef,
});
</script>

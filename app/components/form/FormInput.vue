<template>
  <div class="flex flex-col">
    <label :for="id" class="text-lg font-semibold">{{ label }}</label>
    <input
      :id
      ref="inputRef"
      v-model="model"
      :type
      v-bind="rest"
      class="bg-background border-2 border-foreground user-invalid:border-error rounded-xl px-4 py-2"
    />
    <div aria-live="polite">
      <p v-if="error" class="text-error text-sm text-left mt-2">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string>();
const id = useId();
const inputRef = ref<HTMLInputElement | null>(null);

const {
  type = "text",
  label,
  error,
  ...rest
} = defineProps<{
  type?: "password" | "text" | "email";
  placeholder?: string;
  autocomplete?: string;
  autofocus?: boolean;
  disabled?: boolean;
  required?: boolean;
  label: string;
  name: string;
  maxlength?: number;
  error?: string;
}>();

defineExpose({
  inputRef,
});
</script>

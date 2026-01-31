<template>
  <div class="relative">
    <input
      :id="value"
      v-model="model"
      type="checkbox"
      :name="name"
      :value="value"
      class="peer sr-only"
    />
    <label
      :for="value"
      class="block rounded-lg py-4 pl-4 pr-10 border-2 border-foreground text-lg cursor-pointer peer-checked:bg-green-800/10 peer-focus-visible:outline-2 outline-offset-2 outline-accent select-none transition-colors ease-out duration-default"
    >
      {{ label }}
    </label>
    <IconCheck
      aria-hidden
      class="size-7 absolute right-3 top-1/2 -translate-y-1/2 invisible peer-checked:visible"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
  name: string;
}>();

const model = defineModel<string[] | boolean>();
</script>

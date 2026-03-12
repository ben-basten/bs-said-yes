<template>
  <div v-if="isGroup" class="relative">
    <input
      :id="inputId"
      v-model="groupModel"
      type="checkbox"
      :name="name"
      :value="value"
      class="peer sr-only"
    />
    <label
      :for="inputId"
      class="block rounded-lg py-4 pl-4 pr-10 border-2 border-foreground text-lg cursor-pointer bg-background peer-checked:bg-green-800/10 peer-focus-visible:outline-2 outline-offset-2 outline-accent select-none transition-colors ease-out duration-default"
    >
      {{ label }}
    </label>
    <IconCheck
      aria-hidden
      class="size-7 absolute right-3 top-1/2 -translate-y-1/2 invisible peer-checked:visible"
    />
    <IconClose
      aria-hidden
      class="text-error size-7 absolute right-3 top-1/2 -translate-y-1/2 visible peer-checked:invisible"
    />
  </div>
  <div v-else class="flex items-center gap-3">
    <input
      :id="inputId"
      v-model="booleanModel"
      type="checkbox"
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

const booleanModel = defineModel<boolean>();
const groupModel = defineModel<string[]>("group");

const fallbackId = useId();
const isGroup = computed(() => props.value !== undefined);
const inputId = computed(() => (isGroup.value ? props.value! : fallbackId));
</script>

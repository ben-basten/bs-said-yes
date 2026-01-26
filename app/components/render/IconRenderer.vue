<template>
  <component :is="Icon" v-if="Icon" class="size-5 shrink-0" />
</template>

<script setup lang="ts">
import { IconApple, IconDownload, IconGoogle } from "#components";
export type IconType = "Download" | "Apple" | "Google";

const icons: Record<IconType, Component> = {
  Download: IconDownload,
  Apple: IconApple,
  Google: IconGoogle,
};
const props = defineProps<{
  icon: IconType | null | undefined;
}>();

const Icon = computed(() => {
  if (!props.icon) return null;
  return icons[props.icon];
});
</script>

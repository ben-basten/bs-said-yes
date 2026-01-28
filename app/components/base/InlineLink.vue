<template>
  <NuxtLink
    :to="href"
    :target="external ? '_blank' : undefined"
    class="group inline-flex flex-row gap-px items-center"
  >
    <IconRenderer :icon="typedIcon" aria-hidden class="size-5 shrink-0 mr-2" />
    <slot />
    <IconArrowOutward
      v-if="external && showExternalIcon"
      aria-label="opens in new tab"
      class="w-[1em] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-default ease-default"
    />
    <div v-else-if="$slots.trailing" aria-hidden class="size-5 shrink-0 ml-2">
      <slot name="trailing" />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { IconType } from "~/components/render/IconRenderer.vue";

const { showExternalIcon = true, icon } = defineProps<{
  href: string;
  external?: boolean | null;
  showExternalIcon?: boolean;
  icon?: string | null;
}>();

const typedIcon = computed(() => icon as IconType | null);
</script>

<template>
  <NuxtLink
    :to="href"
    :target="external ? '_blank' : undefined"
    class="group inline-flex flex-row gap-px"
  >
    <slot />
    <IconArrowOutward
      v-if="external"
      aria-label="opens in new tab"
      class="w-[1em] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-default ease-default"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  href: string;
  external?: boolean | null;
}>();
</script>

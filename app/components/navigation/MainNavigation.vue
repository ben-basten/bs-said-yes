<template>
  <nav class="text-center">
    <ul class="flex gap-x-5 justify-center">
      <li v-for="(link, index) in links" :key="link?.url ?? index">
        <NuxtLink
          v-if="link?.url"
          :to="link.url"
          :external="link.external ?? false"
          class="text-lg"
        >
          {{ link.text }}
        </NuxtLink>
      </li>
      <li v-if="cta">
        <NuxtLink
          :to="cta.url ?? '#'"
          :external="cta.external ?? false"
          class="text-lg"
        >
          {{ cta.text }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { LinkFragment } from "~~/shared/types/graphql";
defineProps<{
  links: (LinkFragment | null)[];
  cta: LinkFragment | null;
}>();
</script>

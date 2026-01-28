<template>
  <ul
    v-if="filteredLinks.length > 0"
    class="flex flex-row flex-wrap gap-x-15 gap-y-2"
    :class="{
      'justify-start': align === 'start',
      'justify-center': align === 'center',
    }"
  >
    <li v-for="(link, index) in filteredLinks" :key="link.url ?? index">
      <InlineLink
        :href="link.fileDownload?.url ?? link.url ?? ''"
        :external="link.external"
        :show-external-icon="false"
        :icon="link.icon"
        class="no-underline text-foreground hover:text-accent font-semibold text-xl py-2 items-center"
      >
        {{ link.text }}
        <template #trailing>
          <IconArrowForward
            class="text-action group-hover:translate-x-2 transition-transform duration-default ease-default"
          />
        </template>
      </InlineLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { LinkFragment } from "~~/shared/types/graphql";

const { links, align = "start" } = defineProps<{
  links: (LinkFragment | null)[] | undefined;
  align?: "start" | "center";
}>();

const filteredLinks = computed(() =>
  (links ?? []).filter((link) => link !== null),
);
</script>

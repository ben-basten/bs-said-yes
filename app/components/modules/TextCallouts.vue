<template>
  <ContentContainer margin class="flex flex-col gap-y-7">
    <Heading as="h2">{{ data.heading }}</Heading>
    <div class="divider" />
    <div class="w-full grid-12">
      <div
        v-for="(item, index) in callouts"
        :key="index"
        class="py-6 max-md:first:pt-0 col-span-full md:col-span-6 border-b-2 border-accent sm:mr-10"
      >
        <Heading as="h3" class="text-2xl mb-2">{{ item.title }}</Heading>
        <RichTextRenderer
          v-if="item.copy"
          :json="item.copy.json"
          class="max-w-copy"
        />
      </div>
    </div>
  </ContentContainer>
</template>

<script setup lang="ts">
import type { ModuleProps } from "~/types/module";
import type { TextCalloutsFragment } from "~~/shared/types/graphql";

const { data } = defineProps<ModuleProps<TextCalloutsFragment>>();

const callouts = computed(() =>
  (data.calloutsCollection?.items || []).filter((item) => item !== null),
);
</script>

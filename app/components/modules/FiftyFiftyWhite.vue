<template>
  <div class="grid-12 gap-y-7">
    <div
      class="col-span-12 max-md:order-2 md:col-span-5 max-w-copy flex flex-col justify-center gap-y-6 mb-8 md:mb-0"
      :class="{
        'md:order-2 md:col-start-8': align === 'Left',
      }"
    >
      <Heading as="h2">{{ data.heading }}</Heading>
      <p class="type-eyebrow order-first">{{ data.eyebrow }}</p>
      <RichTextRenderer :json="data?.copy?.json" />
      <div class="flex flex-wrap gap-x-5 gap-y-3">
        <InlineLink
          v-if="data.callToAction?.url"
          :href="data.callToAction.url"
          :external="data.callToAction.external"
          class="button button-md"
        >
          {{ data.callToAction.text }}
        </InlineLink>
        <InlineLink
          v-if="data.secondaryCallToAction?.url"
          :href="data.secondaryCallToAction.url"
          :external="data.secondaryCallToAction.external"
          class="button-secondary button-md"
        >
          {{ data.secondaryCallToAction.text }}
        </InlineLink>
      </div>
    </div>
    <div
      v-if="data.image?.url"
      class="col-span-12 max-md:order-1 md:col-span-6 my-auto relative flex items-center justify-center overflow-clip"
      :class="{
        'md:col-start-7': align === 'Right',
      }"
    >
      <ContentfulImage
        :src="data.image.url"
        :alt="data.image.description ?? ''"
        sizes="95vw md:50vw lg:730px"
        class="object-cover aspect-4/3 w-full md:h-full rounded-lg"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ModuleProps } from "~/types/module";
import type { FiftyFiftyFragment } from "~~/shared/types/graphql";

const { data } = defineProps<ModuleProps<FiftyFiftyFragment>>();

const align = computed(() => data.imageAlignment as "Left" | "Right");
</script>

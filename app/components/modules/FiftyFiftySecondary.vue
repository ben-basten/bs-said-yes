<template>
  <div
    class="grid-12 bg-secondary max-md:-mx-side-mobile md:px-0 md:rounded-2xl overflow-hidden"
  >
    <div
      class="col-span-12 max-md:order-2 md:col-span-5 max-w-copy max-md:mx-side-mobile flex flex-col justify-center gap-y-6 py-10"
      :class="{
        'md:order-2 md:col-start-8 md:mr-side': align === 'Left',
        'md:ml-side': align === 'Right',
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
      class="col-span-12 max-md:order-1 md:col-span-7 relative flex items-center justify-center overflow-clip"
      :class="{
        'md:col-start-6': align === 'Right',
      }"
    >
      <ContentfulImage
        :src="data.image.url"
        :alt="data.image.description ?? ''"
        sizes="95vw md:50vw lg:730px"
        class="object-cover aspect-4/3 w-full md:h-full max-w-none"
      />
      <div
        class="absolute from-secondary to-transparent max-md:left-0 max-md:right-0 md:top-0 bottom-0 bg-linear-to-t max-md:h-1/3 md:w-1/3"
        :class="{
          'md:left-0 md:bg-linear-to-r': align === 'Right',
          'md:right-0 md:bg-linear-to-l': align === 'Left',
        }"
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

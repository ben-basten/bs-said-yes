<template>
  <ContentContainer
    as="section"
    grid
    class="mb-vertical md:mb-vertical-lg gap-y-7"
  >
    <div
      class="col-span-12 max-md:order-2 md:col-span-5 max-w-copy flex flex-col justify-center gap-y-6 mb-8 md:mb-0 md:pr-10"
      :class="{
        'md:order-2 md:col-start-8': align === 'Left',
      }"
    >
      <Heading as="h2">{{ data.heading }}</Heading>
      <RichTextRenderer :json="data?.copy?.json" />
      <InlineLink
        v-if="data.callToAction?.url"
        :href="data.callToAction.url"
        :external="data.callToAction.external"
        class="button-md"
      >
        {{ data.callToAction.text }}
      </InlineLink>
    </div>

    <div
      v-if="data.image?.url"
      class="col-span-12 max-md:order-1 md:col-span-6"
      :class="{
        'md:col-start-7': align === 'Right',
      }"
    >
      <ContentfulImage
        :src="data.image.url"
        alt="Couple celebrating"
        :sizes="undefined"
        class="object-cover rounded-xl aspect-7/5"
      />
    </div>
  </ContentContainer>
</template>

<script setup lang="ts">
import type { ModuleProps } from "~/types/module";
import type { FiftyFiftyFragment } from "~~/shared/types/graphql";

const { data } = defineProps<ModuleProps<FiftyFiftyFragment>>();

const align = computed(() => data.imageAlignment as "Left" | "Right");
</script>

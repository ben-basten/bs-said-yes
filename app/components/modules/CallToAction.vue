<template>
  <ContentContainer margin>
    <div
      class="max-w-160 mx-auto w-full flex flex-col items-center gap-y-7 text-center"
    >
      <Heading as="h2">{{ data.heading }}</Heading>
      <RichTextRenderer
        v-if="data.copy?.json"
        :json="data.copy.json"
        class="max-w-copy"
      />
      <InlineLink
        v-if="data.callToAction?.url"
        :href="data.callToAction.url"
        :external="data.callToAction.external"
        :icon="data.callToAction.icon"
        class="button button-md"
      >
        {{ data.callToAction.text }}
      </InlineLink>
    </div>
  </ContentContainer>
</template>

<script setup lang="ts">
import type { ModuleProps } from "~/types/module";
import type { CallToActionFragment } from "~~/shared/types/graphql";

const { data } = defineProps<ModuleProps<CallToActionFragment>>();
</script>

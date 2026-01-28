<template>
  <ContentContainer as="section" class="mb-vertical md:mb-vertical-lg">
    <div class="max-w-160 mx-auto">
      <Heading as="h2" class="mb-5">{{ data.heading }}</Heading>
      <RichTextRenderer
        :json="data?.text?.json"
        :assets="embeddedAssets"
        class="type-body text-muted mx-auto"
      />
    </div>
  </ContentContainer>
</template>

<script setup lang="ts">
import type { EmbeddedAsset } from "~/components/render/RichTextRenderer.vue";
import type { ModuleProps } from "~/types/module";
import type { CenterTextFragment } from "~~/shared/types/graphql";

const { data } = defineProps<ModuleProps<CenterTextFragment>>();

const embeddedAssets = computed((): EmbeddedAsset[] => {
  const blockAssets = data?.text?.links?.assets?.block;
  if (!blockAssets?.length) return [];
  return blockAssets.filter(
    (asset): asset is EmbeddedAsset => asset !== null && asset.sys?.id != null,
  );
});
</script>

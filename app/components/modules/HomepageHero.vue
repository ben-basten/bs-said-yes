<template>
  <ContentContainer as="section">
    <p>{{ data.heading }}</p>
    <RichTextRenderer :json="data.copy?.json" />
    <ContentfulImage
      v-if="data.image?.url"
      :src="data.image?.url"
      :alt="data.image?.description ?? undefined"
      :sizes="undefined"
    />
  </ContentContainer>
</template>

<script setup lang="ts">
import type { ModuleProps } from "~/types/module";
import type { HomepageHeroFragment } from "~~/shared/types/graphql";

const { data } = defineProps<ModuleProps<HomepageHeroFragment>>();
</script>

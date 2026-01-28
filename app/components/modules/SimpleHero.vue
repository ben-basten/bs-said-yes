<template>
  <section class="mb-vertical md:mb-vertical-lg">
    <div v-if="data.image?.url" class="w-full overflow-hidden">
      <ContentfulImage
        :src="data.image.url"
        :alt="data.image.description ?? ''"
        sizes="100vw md:1050px lg:1300px xl:1500px"
        class="w-full aspect-2/1 md:aspect-3/1 object-cover max-w-max-width mx-auto"
      />
    </div>

    <div class="max-w-copy mx-auto text-center mt-7 md:mt-10">
      <Heading as="h1" class="mb-5">{{ data.heading }}</Heading>
      <RichTextRenderer
        v-if="data.copy?.json"
        :json="data.copy.json"
        class="type-body text-muted max-w-copy mx-auto"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ModuleProps } from "~/types/module";
import type { SimpleHeroFragment } from "~~/shared/types/graphql";

const { data } = defineProps<ModuleProps<SimpleHeroFragment>>();
</script>

<template>
  <section
    class="mb-vertical md:mb-vertical-lg flex flex-col gap-y-7 md:gap-y-10"
    :class="{
      'mt-nav-height nav:mt-10': !data.image?.url,
    }"
  >
    <div v-if="data.image?.url" class="w-full overflow-hidden">
      <ContentfulImage
        :src="data.image.url"
        :alt="data.image.description ?? ''"
        sizes="100vw md:1050px lg:1300px xl:1500px"
        class="w-full aspect-2/1 md:aspect-3/1 object-cover max-w-max-width mx-auto"
      />
    </div>

    <ContentContainer>
      <div class="max-w-copy mx-auto text-center">
        <Heading as="h1" class="mb-5">{{ data.heading }}</Heading>
        <RichTextRenderer
          v-if="data.copy?.json"
          :json="data.copy.json"
          class="type-body text-muted mx-auto"
        />
      </div>
    </ContentContainer>
  </section>
</template>

<script setup lang="ts">
import type { ModuleProps } from "~/types/module";
import type { SimpleHeroFragment } from "~~/shared/types/graphql";

const { data } = defineProps<ModuleProps<SimpleHeroFragment>>();
</script>

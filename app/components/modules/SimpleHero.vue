<template>
  <section
    class="mb-vertical md:mb-vertical-lg flex flex-col gap-y-7 md:gap-y-10"
    :class="{
      'mt-nav-height nav:mt-10': !data.image?.url,
    }"
  >
    <div
      v-if="data.image?.url"
      ref="image"
      class="w-full overflow-hidden animate-hide"
    >
      <ContentfulImage
        :src="data.image.url"
        :alt="data.image.description ?? ''"
        loading="eager"
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
          class="type-body mx-auto"
        />
      </div>
    </ContentContainer>
  </section>
</template>

<script setup lang="ts">
import type { ModuleProps } from "~/types/module";
import gsap from "gsap";
import type { SimpleHeroFragment } from "~~/shared/types/graphql";

const imageRef = useTemplateRef<HTMLElement | null>("image");

const { data } = defineProps<ModuleProps<SimpleHeroFragment>>();

onMounted(() => {
  if (!imageRef.value) return;
  const tl = gsap.timeline({
    defaults: {
      duration: 0.5,
      ease: "power3.out",
    },
  });

  tl.to(imageRef.value, {
    opacity: 1,
    y: 0,
  });
});
</script>

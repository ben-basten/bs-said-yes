<template>
  <ContentContainer
    as="section"
    grid
    class="gap-y-12 mt-nav-height mb-vertical md:mb-vertical-lg"
  >
    <div
      class="col-span-12 md:col-span-5 md:col-start-1 flex flex-col gap-y-5 my-auto"
    >
      <p class="type-eyebrow">
        {{ data.eyebrow }}
      </p>
      <Heading as="h1" class="text-5xl xl:text-6xl 2xl:text-7xl">
        {{ data.heading }}
      </Heading>
      <div class="flex flex-col gap-y-3 mt-2">
        <div v-if="data.date" class="flex items-center gap-x-3 type-body">
          <IconCalendar aria-hidden class="w-7 text-accent" />
          <span>{{ data.date }}</span>
        </div>
        <div v-if="data.location" class="flex items-center gap-x-3 type-body">
          <IconPinHeart aria-hidden class="w-7 text-accent" />
          <span>{{ data.location }}</span>
        </div>
      </div>
    </div>
    <div
      class="col-span-12 md:col-span-7 md:col-start-6 grid grid-cols-2 gap-2 md:gap-4"
    >
      <ContentfulImage
        v-for="(image, index) in images"
        :key="image.url ?? index"
        :src="image.url!"
        :alt="image.description ?? ''"
        sizes="50vw md:200px lg:400px"
        :class="[
          'col-span-1 w-full aspect-4/3 object-cover rounded-lg',
          { 'mt-8': index === 1, '-mt-8': index === 2 },
        ]"
      />
    </div>
  </ContentContainer>
</template>

<script setup lang="ts">
import type { ModuleProps } from "~/types/module";
import type { HomepageHeroFragment } from "~~/shared/types/graphql";

const { data } = defineProps<ModuleProps<HomepageHeroFragment>>();

const images = computed(() =>
  (data.imagesCollection?.items ?? []).filter((image) => image !== null),
);
</script>

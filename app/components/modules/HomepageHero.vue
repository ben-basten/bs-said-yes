<template>
  <ContentContainer
    as="section"
    grid
    class="gap-y-5 mt-10 mb-vertical md:mb-vertical-lg"
  >
    <div
      class="col-span-12 md:col-span-5 md:col-start-1 flex flex-col gap-y-5 my-auto"
    >
      <p class="text-sm text-muted uppercase tracking-wide">
        {{ data.eyebrow }}
      </p>
      <Heading as="h1" class="text-5xl xl:text-6xl 2xl:text-7xl">{{
        data.heading
      }}</Heading>
      <div class="flex flex-col gap-y-3 mt-2">
        <div v-if="data.date" class="flex items-center gap-x-3 type-body">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-action"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            />
          </svg>
          <span>{{ data.date }}</span>
        </div>
        <div v-if="data.location" class="flex items-center gap-x-3 type-body">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-action"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            />
          </svg>
          <span>{{ data.location }}</span>
        </div>
      </div>
    </div>
    <div
      class="col-span-12 md:col-span-7 md:col-start-6 grid grid-cols-2 gap-4"
    >
      <ContentfulImage
        v-if="images[0]?.url"
        :src="images[0].url"
        :alt="images[0].description ?? ''"
        :sizes="undefined"
        class="col-span-1 aspect-3/4 object-cover rounded-xl"
      />
      <ContentfulImage
        v-if="images[1]?.url"
        :src="images[1].url"
        :alt="images[1].description ?? ''"
        :sizes="undefined"
        class="col-span-1 aspect-3/4 object-cover rounded-xl mt-8"
      />
    </div>
  </ContentContainer>
</template>

<script setup lang="ts">
import type { ModuleProps } from "~/types/module";
import type { HomepageHeroFragment } from "~~/shared/types/graphql";

const { data } = defineProps<ModuleProps<HomepageHeroFragment>>();

const images = computed(() => data.imagesCollection?.items ?? []);
</script>

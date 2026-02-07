<template>
  <ContentContainer as="section" margin grid class="gap-y-7 md:gap-y-10">
    <div class="col-span-full max-w-copy mx-auto text-center">
      <Heading as="h2" class="mb-6">{{ data.heading }}</Heading>
      <RichTextRenderer :json="data?.copy?.json" class="type-body text-muted" />
    </div>

    <div
      v-if="data.eventDate"
      class="col-span-full mx-auto text-center flex flex-col items-center gap-y-6"
    >
      <Heading as="h3" variant="h4">{{ data.eventDate }}</Heading>
      <div class="divider" />
    </div>

    <div
      class="col-span-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="(event, index) in events"
        :key="index"
        class="rounded-xl p-6 text-center bg-secondary"
      >
        <Heading as="h4" class="mb-2">{{ event.title }}</Heading>
        <RichTextRenderer
          :json="event.copy?.json"
          class="type-body [&_>_p]:my-3!"
        />
      </div>
    </div>

    <LinkCollection
      :links="data.callToActionCollection?.items"
      align="center"
      class="col-span-full mx-auto md:px-side"
    />
  </ContentContainer>
</template>

<script setup lang="ts">
import type { ModuleProps } from "~/types/module";
import type { ScheduleFragment } from "~~/shared/types/graphql";

const { data } = defineProps<ModuleProps<ScheduleFragment>>();

const events = computed(
  () => data.eventsCollection?.items.filter((item) => item !== null) ?? [],
);
</script>

<template>
  <ContentContainer
    as="section"
    grid
    class="mb-vertical md:mb-vertical-lg gap-y-7"
  >
    <div class="col-span-12 md:col-span-5 max-w-copy flex flex-col gap-y-6">
      <Heading as="h2">{{ data.heading }}</Heading>
      <RichTextRenderer :json="data?.copy?.json" />
    </div>

    <div class="col-span-12 md:col-span-6 md:col-start-7">
      <AccordionRoot type="multiple" collapsible class="flex flex-col">
        <AccordionItem
          v-for="(item, index) in items"
          :key="index"
          :value="`item-${index}`"
          class="border-b-2 border-accent"
        >
          <AccordionHeader as="h3">
            <AccordionTrigger
              class="group flex gap-x-4 w-full items-center justify-between py-6 text-left type-h4 cursor-pointer"
            >
              <span>{{ item.title }}</span>
              <IconChevronDown
                class="size-5 shrink-0 transition-transform duration-default ease-default group-data-[state=open]:rotate-180"
              />
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent
            class="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp"
          >
            <div class="pb-4 type-body">
              <RichTextRenderer :json="item.copy?.json" />
            </div>
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>
    </div>
  </ContentContainer>
</template>

<script setup lang="ts">
import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from "reka-ui";
import type { ModuleProps } from "~/types/module";
import type { AccordionFragment } from "~~/shared/types/graphql";

const { data } = defineProps<ModuleProps<AccordionFragment>>();

const items = computed(
  () => data.itemsCollection?.items.filter((item) => item !== null) ?? [],
);
</script>

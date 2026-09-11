<template>
  <RSVP v-if="data.enabled" />
  <ContentContainer v-else margin>
    <div className="form-container mx-auto flex flex-col gap-y-5">
      <Heading as="h2">RSVPs are closed</Heading>
      <RichTextRenderer v-if="rsvpClosedMessage" :json="rsvpClosedMessage" />
    </div>
  </ContentContainer>
</template>

<script setup lang="ts">
import type { ModuleProps } from "~/types/module";
import type { FormFragment } from "~~/shared/types/graphql";

const { data } = defineProps<ModuleProps<FormFragment>>();

const rsvpClosedMessage = computed(() => data.rsvpClosedMessage?.json);
</script>

<template>
  <ContentContainer as="section" margin>
    <FiftyFiftySecondary v-if="background === 'Tan'" :data="data" />
    <FiftyFiftyWhite v-else :data="data" />
  </ContentContainer>
</template>

<script setup lang="ts">
import type { ModuleProps } from "~/types/module";
import type { FiftyFiftyFragment } from "~~/shared/types/graphql";

const { data } = defineProps<ModuleProps<FiftyFiftyFragment>>();

const background = computed(() => data.background as "White" | "Tan");
</script>

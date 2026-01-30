<template>
  <Memory v-if="formType === 'Memory'" />
  <RSVP v-else-if="formType === 'RSVP'" />
</template>

<script setup lang="ts">
import type { ModuleProps } from "~/types/module";
import type { FormFragment } from "~~/shared/types/graphql";

const { data } = defineProps<ModuleProps<FormFragment>>();

const formType = computed(() => data.formType as "RSVP" | "Memory");
</script>

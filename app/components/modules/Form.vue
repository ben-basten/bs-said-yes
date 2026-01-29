<template>
  <Memory v-if="formType === 'Memory'" />
</template>

<script setup lang="ts">
import type { ModuleProps } from "~/types/module";

const { data } = defineProps<ModuleProps<FormFragment>>();

const formType = computed(() => data.formType as "RSVP" | "Memory");
</script>

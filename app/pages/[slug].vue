<template>
  <PageStandard :slug />
</template>

<script setup lang="ts">
import PageStandard from "~/components/PageStandard.vue";
const route = useRoute();
const slug = computed(() => route.params.slug as string);
</script>

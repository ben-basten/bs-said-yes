<template>
  <PageStandard :slug />
</template>

<script setup lang="ts">
const route = useRoute();
const slug = computed(() => route.params.slug as string);
if (slug.value === "home") {
  throw createError({ statusCode: 404, statusMessage: "Not Found" });
}
</script>

<template>
  <PageStandard :slug />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["authenticated"],
});

const route = useRoute();
const slug = computed(() => route.params.slug as string);
if (slug.value === "home") {
  await navigateTo({ path: "/", query: route.query }, { replace: true });
}
</script>

<script setup lang="ts">
definePageMeta({
  middleware: ["authenticated"],
});
</script>

<template>
  <PageStandard slug="home" />
</template>

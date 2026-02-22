<template>
  <Chip v-if="isAttending === true" color="green"> Attending </Chip>
  <Chip v-else-if="isAttending === false" color="red"> Not Attending </Chip>
  <Chip v-else color="yellow">Not Responded</Chip>
</template>

<script setup lang="ts">
defineProps<{
  isAttending: boolean | null;
}>();
</script>

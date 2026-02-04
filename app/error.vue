<template>
  <NuxtLayout>
    <ContentContainer class="mt-10">
      <div
        class="max-w-160 text-center flex flex-col gap-7 md:gap-10 items-center mx-auto my-auto"
      >
        <Heading as="h1" variant="h2">{{ message }}</Heading>
        <InlineLink href="/" class="button button-lg" @click="handleError">
          Go back home
        </InlineLink>
      </div>
    </ContentContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

const { error } = defineProps({
  error: Object as () => NuxtError,
});

const message = computed(() => {
  if (error?.statusCode === 404) {
    return "Ope! That page could not be found.";
  } else if (error?.statusCode === 403) {
    return "Unauthorized";
  } else {
    return "Something unexpected went wrong.";
  }
});
const handleError = () => clearError({ redirect: "/" });
</script>

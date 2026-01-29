<script setup lang="ts">
definePageMeta({
  middleware: "authenticated",
  layout: "admin",
});

useHead({
  title: "Admin Dashboard",
});

const { user } = useUserSession();
</script>

<template>
  <ContentContainer class="mt-10">
    <div class="bg-secondary rounded-xl p-6 md:p-8">
      <Heading as="h2" variant="h3" class="text-foreground mb-2">
        Welcome, {{ user?.name }}!
      </Heading>
      <p class="type-body">You are logged in as an admin.</p>
    </div>
  </ContentContainer>
</template>

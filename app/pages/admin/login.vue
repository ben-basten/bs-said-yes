<script setup lang="ts">
definePageMeta({
  layout: "minimal",
});

useHead({
  title: "Admin Login",
});

const route = useRoute();
const { loggedIn, user } = useUserSession();

watchEffect(() => {
  if (loggedIn.value && user.value?.permission === "admin") {
    navigateTo("/admin/dashboard", { replace: true });
  }
});

const error = computed(() => {
  const errorParam = route.query.error;
  if (errorParam === "unauthorized") {
    return "You are not authorized to access the admin dashboard.";
  }
  if (errorParam === "oauth_failed") {
    return "Authentication failed. Please try again.";
  }
  return null;
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div
      class="bg-secondary w-full max-w-xl p-10 rounded-xl flex flex-col gap-y-5 items-center"
    >
      <Heading as="h1" variant="h2">Admin Login</Heading>
      <p class="type-body">
        Sign in with GitHub to access the admin dashboard.
      </p>

      <div class="w-full max-w-sm flex flex-col gap-4">
        <div v-if="error" aria-live="polite" class="text-left">
          <p class="text-error text-sm mt-2">{{ error }}</p>
        </div>
        <a
          href="/auth/github"
          class="button button-md w-full inline-flex items-center justify-center gap-3"
        >
          <IconGitHub />
          Sign in with GitHub
        </a>
      </div>
    </div>
  </div>
</template>

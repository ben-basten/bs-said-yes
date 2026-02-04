<script setup lang="ts">
import type { AuthError } from "~~/shared/types/AuthError";

definePageMeta({
  layout: "minimal",
});

useHead({
  title: "Admin Login",
});

const route = useRoute();
const { loggedIn, user } = useUserSession();
const errorMessage = ref<string | null>(null);

const errorParam = route.query.error as AuthError | undefined;
if (errorParam === "unauthorized") {
  errorMessage.value = "You are not authorized to access the admin dashboard.";
} else if (errorParam === "oauth_failed") {
  errorMessage.value = "Authentication failed.";
} else if (errorParam === "unknown") {
  errorMessage.value = "An unknown error occurred.";
}

onMounted(() => {
  if (route.query.error) {
    navigateTo(route.path, { replace: true });
  }
});

watchEffect(() => {
  if (loggedIn.value && user.value?.permission === "admin") {
    navigateTo("/admin/dashboard", { replace: true });
  }
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="form-container flex flex-col gap-y-5 items-center">
      <Heading as="h1" variant="h2">Admin Login</Heading>
      <p class="type-body">
        Sign in with GitHub to access the admin dashboard.
      </p>

      <div class="w-full max-w-sm flex flex-col gap-4">
        <div v-if="errorMessage" aria-live="polite">
          <p class="text-error text-sm">{{ errorMessage }}</p>
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

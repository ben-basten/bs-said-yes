<script setup lang="ts">
definePageMeta({
  middleware: "authenticated",
  layout: "minimal",
});

const route = useRoute();

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
  <div class="admin-login">
    <div class="admin-login__container">
      <h1 class="admin-login__title">Admin Login</h1>
      <p class="admin-login__subtitle">
        Sign in with GitHub to access the admin dashboard.
      </p>

      <div v-if="error" class="admin-login__error">
        {{ error }}
      </div>

      <a href="/auth/github" class="admin-login__button">
        <svg
          class="admin-login__icon"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clip-rule="evenodd"
          />
        </svg>
        Sign in with GitHub
      </a>
    </div>
  </div>
</template>

<style scoped>
.admin-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-cream);
  padding: 1rem;
}

.admin-login__container {
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.admin-login__title {
  font-family: var(--font-heading);
  font-size: 2rem;
  color: var(--color-green);
  margin-bottom: 0.5rem;
}

.admin-login__subtitle {
  color: var(--color-text-muted);
  margin-bottom: 2rem;
}

.admin-login__error {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
}

.admin-login__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background-color: #24292f;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s;
}

.admin-login__button:hover {
  background-color: #32383f;
}

.admin-login__icon {
  width: 1.25rem;
  height: 1.25rem;
}
</style>

<template>
  <div class="min-h-screen flex items-center justify-center bg-neutral-100 p-4">
    <form class="w-full max-w-xs flex flex-col gap-4" @submit.prevent="login">
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="w-full px-4 py-3 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-400"
        autocomplete="current-password"
        autofocus
      />

      <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>

      <button
        type="submit"
        class="w-full py-3 bg-neutral-900 text-white rounded-md hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="isLoading"
      >
        {{ isLoading ? "..." : "Enter" }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "minimal",
});

const { loggedIn, fetch: refreshSession } = useUserSession();
const password = ref("");
const error = ref("");
const isLoading = ref(false);

// Redirect if already logged in
watchEffect(() => {
  if (loggedIn.value) {
    navigateTo("/");
  }
});

async function login() {
  error.value = "";
  isLoading.value = true;

  try {
    await $fetch("/api/login", {
      method: "POST",
      body: { password: password.value },
    });

    await refreshSession();
    await navigateTo("/");
    
  } catch (e: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    if (e.status === 401) {
      error.value = "Invalid password";
    } else {
      error.value = "An error occurred";
    }
    password.value = "";
  } finally {
    isLoading.value = false;
  }
}
</script>

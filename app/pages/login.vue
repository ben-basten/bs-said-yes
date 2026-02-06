<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="form-container flex flex-col gap-y-5 items-center">
      <Heading as="h1" variant="h2">Login</Heading>
      <p class="type-body">Enter the password from your save the date.</p>
      <form class="w-full max-w-sm flex flex-col gap-4" @submit.prevent="login">
        <div>
          <FormInput
            ref="passwordRef"
            type="password"
            name="password"
            label="Password"
            autocomplete="current-password"
            autofocus
            required
            :error
          />
        </div>
        <button
          type="submit"
          class="button button-md w-full"
          :disabled="isLoading"
        >
          {{ isLoading ? "Loading..." : "Enter" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormInput from "~/components/form/FormInput.vue";

definePageMeta({
  layout: "minimal",
});

useHead({
  title: "Login",
});

const { loggedIn, fetch: refreshSession } = useUserSession();
const route = useRoute();
const error = shallowRef("");
const isLoading = shallowRef(false);
const passwordRef = ref<InstanceType<typeof FormInput> | null>(null);

const proceedToSite = async () => {
  const redirect = (route.query.redirect as string) || "/";
  await navigateTo(redirect, { replace: true });
};

// Redirect if already logged in
watchEffect(() => {
  if (loggedIn.value) {
    proceedToSite();
  }
});

async function login(event: SubmitEvent) {
  if (isLoading.value) return;

  error.value = "";
  isLoading.value = true;
  const formData = new FormData(event.target as HTMLFormElement);

  try {
    await $fetch("/api/login", {
      method: "POST",
      body: { password: formData.get("password") },
    });

    await refreshSession();
    proceedToSite();
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((e as any).status === 401) {
      error.value = "Invalid password";
    } else {
      error.value = "An error occurred";
    }
    passwordRef.value?.inputRef?.focus();
  } finally {
    isLoading.value = false;
  }
}
</script>

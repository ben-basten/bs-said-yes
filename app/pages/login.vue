<script setup lang="ts">
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
  } catch {
    error.value = "Invalid password";
    password.value = "";
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-title">Enter Password</h1>

      <form class="login-form" @submit.prevent="login">
        <div class="input-group">
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="password-input"
            autocomplete="current-password"
            autofocus
          />
        </div>

        <p v-if="error" class="error-message">{{ error }}</p>

        <button type="submit" class="submit-button" :disabled="isLoading">
          {{ isLoading ? "Checking..." : "Enter" }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  padding: 1rem;
}

.login-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.5rem;
  padding: 3rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.login-title {
  font-family: "Playfair Display", Georgia, serif;
  font-size: 1.75rem;
  font-weight: 500;
  color: #f8f8f8;
  text-align: center;
  margin-bottom: 2rem;
  letter-spacing: 0.02em;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.input-group {
  position: relative;
}

.password-input {
  width: 100%;
  padding: 1rem 1.25rem;
  font-size: 1rem;
  font-family: inherit;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 0.75rem;
  color: #f8f8f8;
  transition: all 0.2s ease;
  outline: none;
}

.password-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.password-input:focus {
  border-color: rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.05);
}

.error-message {
  color: #ff6b6b;
  font-size: 0.875rem;
  text-align: center;
  margin: 0;
}

.submit-button {
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  font-family: inherit;
  background: linear-gradient(135deg, #e94560 0%, #c73659 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -10px rgba(233, 69, 96, 0.5);
}

.submit-button:active:not(:disabled) {
  transform: translateY(0);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

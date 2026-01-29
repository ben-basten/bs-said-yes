<script setup lang="ts">
definePageMeta({
  middleware: "authenticated",
  layout: "minimal",
});

const { user, clear } = useUserSession();

async function logout() {
  await clear();
  navigateTo("/admin/login");
}
</script>

<template>
  <div class="admin-dashboard">
    <header class="admin-dashboard__header">
      <h1 class="admin-dashboard__title">Admin Dashboard</h1>
      <div class="admin-dashboard__user">
        <img
          v-if="user?.avatarUrl"
          :src="user.avatarUrl"
          :alt="user.name || user.githubUsername"
          class="admin-dashboard__avatar"
        />
        <span class="admin-dashboard__username">
          {{ user?.name || user?.githubUsername }}
        </span>
        <button class="admin-dashboard__logout" @click="logout">Logout</button>
      </div>
    </header>

    <main class="admin-dashboard__content">
      <div class="admin-dashboard__welcome">
        <h2>Welcome, {{ user?.name || user?.githubUsername }}!</h2>
        <p>You are logged in as an admin.</p>
      </div>

      <!-- Add your admin dashboard content here -->
    </main>
  </div>
</template>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  background-color: var(--color-cream);
}

.admin-dashboard__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: white;
  border-bottom: 1px solid var(--color-border);
}

.admin-dashboard__title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: var(--color-green);
}

.admin-dashboard__user {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.admin-dashboard__avatar {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
}

.admin-dashboard__username {
  font-weight: 500;
  color: var(--color-text);
}

.admin-dashboard__logout {
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: 1px solid var(--color-border);
  border-radius: 0.375rem;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;
}

.admin-dashboard__logout:hover {
  background-color: var(--color-cream);
}

.admin-dashboard__content {
  padding: 2rem;
}

.admin-dashboard__welcome {
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
}

.admin-dashboard__welcome h2 {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: var(--color-green);
  margin-bottom: 0.5rem;
}

.admin-dashboard__welcome p {
  color: var(--color-text-muted);
}
</style>

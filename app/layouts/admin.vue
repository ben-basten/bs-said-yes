<script setup lang="ts">
const { user, clear } = useUserSession();

async function logout() {
  await clear();
  navigateTo("/admin/login");
}

const menuItems = [
  { label: "Home", path: "/" },
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Memories", path: "/admin/memories" },
];
const route = useRoute();
</script>

<template>
  <div class="min-h-screen bg-background">
    <ContentContainer>
      <header
        class="flex items-center justify-between border-b-2 border-secondary py-4"
      >
        <div class="flex gap-3">
          <InlineLink
            v-for="item in menuItems"
            :key="item.path"
            :href="item.path"
            :aria-current="ariaCurrent(item.path, route.path)"
            class="no-underline aria-[current=page]:underline"
          >
            {{ item.label }}
          </InlineLink>
        </div>
        <div class="flex items-center gap-3 md:gap-10">
          <div class="flex items-center gap-3">
            <span class="font-medium text-foreground hidden sm:inline">
              {{ user?.name }}
            </span>
          </div>
          <button type="button" class="button button-sm" @click="logout">
            Logout
          </button>
        </div>
      </header>
    </ContentContainer>

    <main>
      <slot />
    </main>
  </div>
</template>

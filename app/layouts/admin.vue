<script setup lang="ts">
const { user, clear } = useUserSession();

async function logout() {
  await clear();
  navigateTo("/admin/login");
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <ContentContainer>
      <header
        class="flex items-center justify-between border-b-2 border-secondary py-4"
      >
        <Heading as="h1" variant="h3" class="text-foreground"> Admin </Heading>
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

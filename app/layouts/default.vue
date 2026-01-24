<template>
  <div class="min-h-screen flex flex-col">
    <SkipLink>Skip to main content</SkipLink>
    <MainNavigation v-if="navigation" class="isolate" :links="navigation.navigationLinksCollection?.items ?? []"
      :cta="navigation.navigationCta" />
    <main tabindex="-1" class="outline-none flex-1 isolate nav:mt-nav-height">
      <slot />
    </main>
    <Footer v-if="navigation" class="isolate" :copy="navigation.footerCopy?.json ?? null" />
  </div>
</template>

<script setup lang="ts">
import type { NavigationQuery } from "~~/shared/types/graphql";

type Navigation = NonNullable<
  NonNullable<NavigationQuery["navigationCollection"]>["items"][number]
>;

const { data: navigation } = await useFetch<Navigation>("/api/cms/navigation");

useHead({
  meta: [{ name: "robots", content: "noindex, nofollow" }],
});
</script>

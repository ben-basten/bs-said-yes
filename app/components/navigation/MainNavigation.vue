<template>
  <nav class="relative z-100" aria-label="site" @focusin="handleFocusIn">
    <div
      class="hidden nav:block shadow-sm fixed top-0 left-0 right-0 bg-background transition-transform duration-default ease-default"
      :class="{
        '-translate-y-full': !isVisible
      }">
      <ContentContainer class="flex justify-between items-center h-nav-height">
        <ul class="hidden nav:flex gap-x-3 xl:gap-x-8 justify-center items-center w-full">
          <li v-for="(link, index) in links" :key="link?.url ?? index">
            <InlineLink v-if="link?.url" :href="link.url" :external="link.external"
              :aria-selected="isSelected(link.url)"
              class="text-lg text-foreground no-underline px-4 py-2 hover:outline-2 outline-accent rounded-xl aria-selected:outline-accent aria-selected:outline-2">
              {{ link.text }}
            </InlineLink>
          </li>
        </ul>
      </ContentContainer>
    </div>
    <MobileMenu :links="links" :cta="cta" />
    <NuxtLink v-if="cta?.url" :to="cta.url" :external="cta.external ?? false" :aria-selected="isSelected(cta.url)"
      class="hidden nav:block floating-button border-background border-2 text-lg button-md fixed top-1.5">
      {{ cta.text }}
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import type { LinkFragment } from "~~/shared/types/graphql";

const { links, cta } = defineProps<{
  links: (LinkFragment | null)[];
  cta: LinkFragment | null;
}>();

const route = useRoute();

const isSelected = (path: string) => {
  return route.path === path;
};

const isVisible = shallowRef(true);

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create({
    start: "top -100",
    onUpdate: (self) => {
      isVisible.value = self.direction === -1;
    },
  });
});

const handleFocusIn = () => {
  isVisible.value = true;
};
</script>

<style scoped>
.floating-button {
  right: max(var(--spacing-side), calc((100vw - var(--spacing-max-width)) / 2 + var(--spacing-side)));
}
</style>

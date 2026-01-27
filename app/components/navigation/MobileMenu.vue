<template>
  <DialogRoot v-model:open="isOpen" @update:open="onOpenChange">
    <DialogTrigger
      class="fixed top-3 right-side-mobile md:right-side z-50 nav:hidden bg-background hover:bg-slate hover:text-white transition-colors duration-default ease-default border-2 border-foreground"
      as-child
    >
      <IconButton label="Open navigation">
        <IconHamburger class="w-7" />
      </IconButton>
    </DialogTrigger>
    <DialogPortal>
      <DialogContent
        class="nav:hidden data-[state=open]:animate-contentShow data-[state=closed]:animate-contentHide fixed z-100 inset-0 bg-slate focus:outline-none"
      >
        <DialogTitle class="sr-only"> Navigation </DialogTitle>
        <DialogClose
          class="absolute z-1000 top-3 right-side-mobile md:right-side text-white hover:bg-background hover:text-foreground transition-colors duration-default ease-default border-2 border-background"
          as-child
        >
          <IconButton label="Close navigation">
            <IconClose class="w-7" />
          </IconButton>
        </DialogClose>
        <ContentContainer
          class="h-full flex flex-col relative py-20 overflow-y-auto"
        >
          <ul
            ref="navList"
            class="flex flex-col gap-y-10 text-center flex-1 justify-center items-center"
          >
            <li
              v-for="(link, index) in links"
              :key="link?.url ?? index"
              class="nav-item opacity-0"
            >
              <InlineLink
                v-if="link?.url"
                :href="link.url"
                :external="link.external ?? false"
                :aria-selected="isSelected(link.url)"
                class="text-2xl text-white no-underline px-4 py-2 border-2 border-transparent hover:border-white rounded-lg aria-selected:border-white"
                @click="onLinkClick"
              >
                {{ link.text }}
              </InlineLink>
            </li>
            <li class="nav-item opacity-0">
              <InlineLink
                v-if="cta?.url"
                :href="cta.url"
                :external="cta.external ?? false"
                :aria-selected="isSelected(cta.url)"
                class="text-2xl button button-lg"
              >
                {{ cta.text }}
              </InlineLink>
            </li>
          </ul>
        </ContentContainer>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "reka-ui";
import gsap from "gsap";
import type { LinkFragment } from "~~/shared/types/graphql";

const route = useRoute();
const navList = ref<HTMLUListElement | null>(null);
const isOpen = ref(false);
const isMobileNav = useMediaQuery("(max-width: 48rem)");

const { links, cta } = defineProps<{
  links: (LinkFragment | null)[];
  cta: LinkFragment | null;
}>();

watch(isMobileNav, (isMobile) => {
  if (!isMobile) {
    onClose();
  }
});

const isSelected = (path: string) => {
  return route.path === path;
};

const onLinkClick = () => {
  onClose();
};

const onClose = () => {
  isOpen.value = false;
  document.body.style.overflow = "auto";
};

const onOpenChange = (open: boolean) => {
  if (!open) {
    onClose();
    return;
  }
  document.body.style.overflow = "hidden";
  nextTick(() => {
    if (navList.value) {
      const items = navList.value.querySelectorAll(".nav-item");
      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.15,
        },
      );
    }
  });
};
</script>

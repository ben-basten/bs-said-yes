<template>
  <DialogRoot :open="open" @update:open="$emit('update:open', $event)">
    <DialogPortal>
      <DialogOverlay
        class="bg-black/40 fixed inset-0 z-50 transition-all duration-300"
      />
      <DialogContent
        class="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw] max-w-150 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-8 shadow-2xl focus:outline-none overflow-y-auto"
      >
        <div class="flex items-start justify-between mb-6">
          <DialogTitle v-if="title" class="text-3xl font-serif">
            {{ title }}
          </DialogTitle>
          <DialogClose as-child>
            <IconButton
              label="Close"
              class="hover:bg-gray-100 transition-colors -mr-2"
            >
              <IconClose class="size-6" />
            </IconButton>
          </DialogClose>
        </div>
        <DialogDescription v-if="description" class="mb-4 text-gray-500 italic">
          {{ description }}
        </DialogDescription>
        <div>
          <slot />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "reka-ui";
import { IconClose } from "#components";

defineProps<{
  open?: boolean;
  title?: string;
  description?: string;
}>();

defineEmits<{
  (e: "update:open", value: boolean): void;
}>();
</script>

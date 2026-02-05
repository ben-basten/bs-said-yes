<template>
  <ContentContainer margin>
    <div class="relative form-container mx-auto flex flex-col gap-y-7">
      <Heading as="h2">Memories</Heading>
      <p class="max-w-copy">
        Tell us your favorite memory or moment you have of Ben/Sydney/both. You
        can write your name or leave it anonymous. Feel free to fill it out
        multiple times.
      </p>
      <form
        class="flex flex-col gap-2"
        :inert="isSuccess"
        @submit.prevent="onSubmit"
      >
        <FormInput ref="titleInput" label="Title" name="title" required />
        <FormInput label="Author (optional)" name="author" />
        <FormTextarea label="Story" name="story" rows="6" required />
        <button
          type="submit"
          class="button button-lg ml-auto"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? "Submitting..." : "Submit" }}
        </button>
        <p v-if="error" class="text-error font-medium text-center">
          {{ error }}
        </p>
      </form>
      <div
        v-if="isSuccess"
        class="absolute bg-secondary inset-0 flex flex-col gap-y-5 justify-center items-center p-6 text-center"
      >
        <Heading
          ref="successHeading"
          as="p"
          variant="h3"
          tabindex="-1"
          class="text-success font-medium text-center outline-none"
        >
          Yay, thank you for sharing! 🎉
        </Heading>
        <button type="button" class="button button-lg mt-2" @click="onReset">
          ...another one?
        </button>
      </div>
    </div>
  </ContentContainer>
</template>

<script setup lang="ts">
const isSubmitting = ref(false);
const isSuccess = ref(false);
const submittedUuid = ref<string | null>(null);
const error = ref<string | null>(null);

const titleInput = ref<{ inputRef: HTMLInputElement | null } | null>(null);
const successHeading = ref<{ $el: HTMLElement } | null>(null);

async function onSubmit(event: Event) {
  if (isSubmitting.value) return;

  const form = event.currentTarget as HTMLFormElement;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  isSubmitting.value = true;
  isSuccess.value = false;
  submittedUuid.value = null;
  error.value = null;

  try {
    const response = await $fetch<{ success: boolean; uuid: string }>(
      "/api/memory",
      {
        method: "POST",
        body: data,
      },
    );
    isSuccess.value = true;
    submittedUuid.value = response.uuid;
    form.reset();
    error.value = null;

    await nextTick();
    successHeading.value?.$el?.focus();
  } catch {
    error.value = "Something went wrong. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
}

async function onReset() {
  isSuccess.value = false;
  submittedUuid.value = null;
  await nextTick();
  titleInput.value?.inputRef?.focus();
}
</script>

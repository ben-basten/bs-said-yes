<template>
  <StepContainer
    heading="Who will be attending?"
    description="Select all members of your party who will be attending the wedding."
    primary-text="Next"
    secondary-text="Previous"
    @submit.prevent="handleSubmit"
  >
    <fieldset class="flex flex-col gap-y-4">
      <div v-for="member in household" :key="member.id" class="relative">
        <input
          :id="member.id"
          type="checkbox"
          :name="member.id"
          class="peer sr-only"
        />
        <label
          :for="member.id"
          class="block rounded-lg p-4 border-2 border-foreground text-lg cursor-pointer peer-checked:bg-green-800/10 peer-focus-visible:outline-2 outline-offset-2 outline-accent select-none transition-colors ease-out duration-default"
        >
          {{ member.name }}
        </label>
        <IconCheck
          aria-hidden
          class="size-7 absolute right-side-mobile top-1/2 -translate-y-1/2 invisible peer-checked:visible"
        />
      </div>
    </fieldset>
  </StepContainer>
</template>

<script setup lang="ts">
const household = [
  { name: "Alice Johnson", id: "alice-johnson" },
  { name: "Bob Johnson", id: "bob-johnson" },
  { name: "Charlie Johnson", id: "charlie-johnson" },
];

const rsvpStore = useRsvpStore();
const handleSubmit = (_: SubmitEvent) => {
  rsvpStore.nextStep();
};
</script>

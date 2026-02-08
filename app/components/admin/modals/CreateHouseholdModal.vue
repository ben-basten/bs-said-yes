<template>
  <Modal v-model:open="isOpen" title="Create New Household">
    <form class="space-y-6" @submit.prevent="createHouseholdSubmit">
      <FormInput
        v-model="createForm.nickname"
        label="Household Nickname"
        name="nickname"
        placeholder="e.g. The Smith Family"
        required
      />

      <FormTextarea
        v-model="createForm.mailingAddress"
        label="Mailing Address"
        name="mailingAddress"
        required
        :rows="4"
      />

      <div class="space-y-4">
        <Heading as="h2" variant="h4" class="font-semibold">Guests</Heading>

        <div
          v-for="(guest, index) in createForm.guests"
          :key="index"
          class="p-4 border border-slate rounded-lg space-y-4 relative"
        >
          <IconButton
            v-if="createForm.guests.length > 1"
            class="absolute top-2 right-2 text-slate hover:text-red-500"
            label="Remove guest"
            @click="removeGuest(index)"
          >
            <IconClose class="size-4" />
          </IconButton>

          <FormInput
            ref="nameRef"
            v-model="guest.name"
            label="Full Name"
            :name="`guest-${index}-name`"
            placeholder="Guest Name"
            :required="
              !(
                guest.relationshipType === 'plus_one' &&
                createForm.guests.length > 1
              )
            "
            @vue:mounted="handleMount(index)"
          />

          <FormSelect
            v-model="guest.relationshipType"
            label="Relationship Type"
            :options="relationshipOptions"
            required
          />
        </div>

        <button
          type="button"
          class="text-sm font-medium underline"
          @click="addGuest"
        >
          + Add Guest
        </button>
      </div>

      <div class="pt-4 flex justify-end gap-3">
        <button
          type="button"
          class="px-6 py-2 border-2 border-foreground rounded-xl hover:bg-secondary transition-colors"
          @click="isOpen = false"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="saving"
          class="px-6 py-2 bg-foreground text-background rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {{ saving ? "Creating..." : "Create Household" }}
        </button>
      </div>
    </form>
  </Modal>
</template>

<script setup lang="ts">
import type { FormInput } from "#components";

const isOpen = defineModel<boolean>("open", { default: false });
const emit = defineEmits(["success"]);

const guestNames = useTemplateRef<InstanceType<typeof FormInput>[] | null>(
  "nameRef",
);
const saving = ref(false);
const createForm = reactive({
  nickname: "",
  mailingAddress: "",
  guests: [{ name: "", relationshipType: "primary" }],
});

const relationshipOptions = [
  { label: "Primary", value: "primary" },
  { label: "Plus One", value: "plus_one" },
  { label: "Child", value: "child" },
];

const handleMount = async (index: number) => {
  if (index < 1) {
    return;
  }
  guestNames.value?.[index]?.inputRef?.focus();
};

const addGuest = () => {
  createForm.guests.push({ name: "", relationshipType: "primary" });
};

const removeGuest = (index: number) => {
  const previousIndex = createForm.guests.length - 2;
  createForm.guests.splice(index, 1);
  guestNames.value?.[previousIndex]?.inputRef?.focus();
};

// Reset form when modal opens
watch(isOpen, (newVal) => {
  if (newVal) {
    createForm.nickname = "";
    createForm.mailingAddress = "";
    createForm.guests = [{ name: "", relationshipType: "primary" }];
  }
});

const createHouseholdSubmit = async () => {
  if (saving.value) return;

  saving.value = true;
  try {
    await $fetch("/api/admin/households", {
      method: "POST",
      body: {
        nickname: createForm.nickname,
        mailingAddress: createForm.mailingAddress,
        guests: createForm.guests.map((guest) => ({
          name: guest.name === "" ? null : guest.name,
          relationshipType: guest.relationshipType,
        })),
      },
    });

    emit("success");
    isOpen.value = false;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to create household:", error);
    alert("An error occurred while creating the household.");
  } finally {
    saving.value = false;
  }
};
</script>

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
        <div class="flex items-center justify-between">
          <Heading as="h2" variant="h4" class="font-semibold">Guests</Heading>
          <button
            type="button"
            class="text-sm font-medium underline"
            @click="addGuest"
          >
            + Add Guest
          </button>
        </div>

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
            v-model="guest.name"
            label="Full Name"
            :name="`guest-${index}-name`"
            placeholder="Guest Name"
            :required="!(guest.relationshipType === 'plus_one')"
          />

          <div class="space-y-1">
            <label class="block text-lg font-semibold text-slate">
              Relationship Type
            </label>
            <select
              v-model="guest.relationshipType"
              class="w-full px-4 py-2 bg-background border-2 border-foreground rounded-xl appearance-none"
              required
            >
              <option value="primary">Primary</option>
              <option value="plus_one">Plus One</option>
              <option value="child">Child</option>
            </select>
          </div>
        </div>
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
const isOpen = defineModel<boolean>("open", { default: false });
const emit = defineEmits(["success"]);

const saving = ref(false);
const createForm = reactive({
  nickname: "",
  mailingAddress: "",
  guests: [{ name: "", relationshipType: "primary" }],
});

const addGuest = () => {
  createForm.guests.push({ name: "", relationshipType: "primary" });
};

const removeGuest = (index: number) => {
  createForm.guests.splice(index, 1);
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
      body: createForm,
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

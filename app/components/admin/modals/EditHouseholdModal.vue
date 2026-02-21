<template>
  <Modal
    v-model:open="isOpen"
    :title="`Edit Household: ${household?.nickname}`"
  >
    <form
      v-if="household"
      class="space-y-6"
      @submit.prevent="updateHouseholdDetails"
    >
      <FormInput
        v-model="editForm.nickname"
        label="Household Nickname"
        name="nickname"
        required
      />

      <FormTextarea
        v-model="editForm.mailingAddress"
        label="Mailing Address"
        name="mailingAddress"
        required
        :rows="4"
      />

      <FormCheckbox v-model="editForm.inviteSent" label="Invitation Sent" />

      <div class="pt-4 flex justify-end gap-3">
        <button
          type="submit"
          :disabled="saving"
          class="order-1 button button-sm"
        >
          {{ saving ? "Saving..." : "Save Changes" }}
        </button>
        <button
          type="button"
          class="button-secondary button-sm"
          @click="isOpen = false"
        >
          Cancel
        </button>
      </div>
    </form>
  </Modal>
</template>

<script setup lang="ts">
import type { Household } from "~/types/Household";

const props = defineProps<{
  household: Household | null;
}>();

const isOpen = defineModel<boolean>("open", { default: false });
const emit = defineEmits(["success"]);

const saving = ref(false);
const editForm = reactive({
  nickname: "",
  mailingAddress: "",
  inviteSent: false,
});

// Update form when household prop changes or when modal opens
watch(
  () => props.household,
  (newHousehold) => {
    if (newHousehold) {
      editForm.nickname = newHousehold.nickname;
      editForm.mailingAddress = newHousehold.mailingAddress;
      editForm.inviteSent = newHousehold.inviteSent;
    }
  },
  { immediate: true },
);

const updateHouseholdDetails = async () => {
  if (!props.household || saving.value) return;

  saving.value = true;
  try {
    await $fetch(`/api/admin/households/${props.household.id}`, {
      method: "PATCH",
      body: editForm,
    });

    emit("success");
    isOpen.value = false;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to update household:", error);
    alert("An error occurred while saving.");
  } finally {
    saving.value = false;
  }
};
</script>

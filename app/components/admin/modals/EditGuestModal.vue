<template>
  <Modal
    v-model:open="isOpen"
    :title="`Edit Guest: ${guest?.name || `Unknown (${guest?.householdNickname})`}`"
    :primary-text="saving ? 'Saving...' : 'Save Changes'"
    secondary-text="Cancel"
    :primary-disabled="saving"
    @primary="updateGuestDetails"
    @secondary="isOpen = false"
  >
    <form v-if="guest" class="space-y-6">
      <FormInput
        v-model="editForm.name"
        label="Guest Name"
        name="name"
        placeholder="Enter name"
        required
      />

      <FormSelect
        v-model="editForm.isAttending"
        label="Attendance Status"
        :options="attendanceOptions"
      />

      <FormCheckbox
        v-model="editForm.isSearchable"
        label="Searchable from RSVP form"
      />
    </form>
  </Modal>
</template>

<script setup lang="ts">
import type { AdminGuest } from "~/types/Guest";

const props = defineProps<{
  guest: AdminGuest | null;
}>();

const isOpen = defineModel<boolean>("open", { default: false });
const emit = defineEmits(["success"]);

const saving = ref(false);
const editForm = reactive({
  name: "",
  isAttending: "",
  isSearchable: false,
});

const attendanceOptions = [
  { label: "Not Responded", value: "null" },
  { label: "Attending", value: "true" },
  { label: "Not Attending", value: "false" },
];

// Update form when guest prop changes or when modal opens
watch(
  () => props.guest,
  (newGuest) => {
    if (newGuest) {
      editForm.name = newGuest.name || "";
      editForm.isAttending =
        newGuest.isAttending === null ? "null" : String(newGuest.isAttending);
      editForm.isSearchable = newGuest.isSearchable;
    }
  },
  { immediate: true },
);

const updateGuestDetails = async () => {
  if (!props.guest || saving.value) return;

  saving.value = true;
  try {
    const isAttending =
      editForm.isAttending === "null" ? null : editForm.isAttending === "true";
    await $fetch(`/api/admin/guests/${props.guest.id}`, {
      method: "PATCH",
      body: {
        name: editForm.name,
        isAttending,
        isSearchable: editForm.isSearchable,
      },
    });

    emit("success");
    isOpen.value = false;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error occurred updating guest:", err);
  } finally {
    saving.value = false;
  }
};
</script>

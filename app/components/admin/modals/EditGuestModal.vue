<template>
  <Modal
    v-model:open="isOpen"
    :title="`Edit Guest: ${guest?.name || `Unknown (${guest?.householdNickname})`}`"
  >
    <form v-if="guest" class="space-y-6" @submit.prevent="updateGuestDetails">
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

      <div class="pt-4 flex justify-end gap-3">
        <button
          type="submit"
          :disabled="saving"
          class="order-1 px-6 py-2 bg-foreground text-background rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {{ saving ? "Saving..." : "Save Changes" }}
        </button>
        <button
          type="button"
          class="px-6 py-2 border-2 border-foreground rounded-xl hover:bg-secondary transition-colors"
          @click="isOpen = false"
        >
          Cancel
        </button>
      </div>
    </form>
  </Modal>
</template>

<script setup lang="ts">
const props = defineProps<{
  guest: {
    id: string;
    name: string | null;
    isAttending: boolean | null;
    householdNickname: string | null;
  } | null;
}>();

const isOpen = defineModel<boolean>("open", { default: false });
const emit = defineEmits(["success"]);

const saving = ref(false);
const editForm = reactive({
  name: "",
  isAttending: "",
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

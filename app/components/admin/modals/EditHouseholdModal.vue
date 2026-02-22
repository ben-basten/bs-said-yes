<template>
  <Modal
    v-model:open="isOpen"
    :title="`Edit Household: ${household?.nickname}`"
    :primary-text="saving ? 'Saving...' : 'Save Changes'"
    secondary-text="Cancel"
    :primary-disabled="saving"
    @primary="updateHouseholdDetails"
    @secondary="isOpen = false"
  >
    <form v-if="household" class="space-y-6">
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

      <div>
        <Heading as="h2" variant="h4">Guests in this Household</Heading>
        <div
          v-for="(guest, index) in guests"
          :key="index"
          class="mt-2 flex gap-x-3 justify-between"
        >
          <p>
            {{ guest.name || "Unnamed Guest" }} ({{
              formatRelationshipType(guest.relationshipType)
            }})
          </p>
          <StatusChip :is-attending="guest.isAttending" class="shrink-0" />
        </div>
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

const guests = computed(() => props.household?.guests || []);
</script>

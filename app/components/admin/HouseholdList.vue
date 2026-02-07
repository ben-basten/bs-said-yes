<template>
  <DashboardContainer
    title="Households"
    :subtitle
    :pagination="listData?.pagination"
    @next="currentPage++"
    @previous="currentPage--"
  >
    <div v-if="pending && !listData" class="p-12 text-center">
      <p class="text-slate italic animate-pulse">Loading households...</p>
    </div>

    <div v-else-if="listData?.items && listData.items.length > 0">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate">
              <th
                class="px-6 py-3 text-left text-xs font-medium text-slate uppercase tracking-wider"
              >
                Nickname
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-slate uppercase tracking-wider"
              >
                Invitation Sent
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-slate uppercase tracking-wider"
              >
                Last Updated
              </th>
              <th
                class="px-6 py-3 text-right text-xs font-medium text-slate uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-secondary">
            <tr
              v-for="household in listData.items"
              :key="household.id"
              class="hover:bg-secondary transition-colors"
            >
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground"
              >
                {{ household.nickname }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <Chip :color="household.inviteSent ? 'green' : 'yellow'">
                  {{ household.inviteSent ? "Sent" : "Pending" }}
                </Chip>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate">
                {{ new Date(household.updatedAt).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
                <button
                  class="button button-sm font-medium"
                  :aria-label="`View details for ${household.nickname}`"
                  @click="openEditModal(household)"
                >
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="p-12 text-center text-slate">No households found.</div>

    <!-- Edit Modal -->
    <Modal
      v-model:open="isModalOpen"
      :title="`Edit Household: ${selectedHousehold?.nickname}`"
    >
      <form
        v-if="selectedHousehold"
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

        <div class="flex items-center gap-3">
          <input
            id="inviteSentCheckbox"
            v-model="editForm.inviteSent"
            type="checkbox"
            class="size-5 rounded border-2 border-foreground accent-accent cursor-pointer"
          />
          <label
            for="inviteSentCheckbox"
            class="text-lg font-semibold cursor-pointer"
          >
            Invitation Sent
          </label>
        </div>

        <div class="pt-4 flex justify-end gap-3">
          <button
            type="button"
            class="px-6 py-2 border-2 border-foreground rounded-xl hover:bg-secondary transition-colors"
            @click="isModalOpen = false"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="saving"
            class="px-6 py-2 bg-foreground text-background rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {{ saving ? "Saving..." : "Save Changes" }}
          </button>
        </div>
      </form>
    </Modal>
  </DashboardContainer>
</template>

<script setup lang="ts">
interface Household {
  id: string;
  nickname: string;
  mailingAddress: string;
  inviteSent: boolean;
  updatedAt: string;
}

const currentPage = ref(1);
const {
  data: listData,
  pending,
  refresh,
} = await useFetch(() => `/api/admin/households/list`, {
  query: { page: currentPage, limit: 20 },
  watch: [currentPage],
});

// Modal state
const isModalOpen = ref(false);
const selectedHousehold = ref<Household | null>(null);
const saving = ref(false);
const editForm = reactive({
  nickname: "",
  mailingAddress: "",
  inviteSent: false,
});

const openEditModal = (household: Household) => {
  selectedHousehold.value = household;
  editForm.nickname = household.nickname;
  editForm.mailingAddress = household.mailingAddress;
  editForm.inviteSent = household.inviteSent;
  isModalOpen.value = true;
};

const updateHouseholdDetails = async () => {
  if (!selectedHousehold.value || saving.value) return;

  saving.value = true;
  try {
    await $fetch(`/api/admin/households/${selectedHousehold.value.id}`, {
      method: "PATCH",
      body: editForm,
    });

    await refresh();
    isModalOpen.value = false;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to update household:", error);
    alert("An error occurred while saving.");
  } finally {
    saving.value = false;
  }
};

const subtitle = computed(() => {
  return formatResultsMessage(listData.value?.pagination);
});
</script>

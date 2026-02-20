<template>
  <DashboardContainer
    title="Guest List"
    :subtitle
    :pagination="listData?.pagination"
    @next="currentPage++"
    @previous="currentPage = Math.max(1, currentPage - 1)"
  >
    <template #actions>
      <FormSelect
        v-model="currentSort"
        label="Sort By"
        :options="sortOptions"
      />
    </template>

    <div v-if="listData?.guests && listData.guests.length > 0">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Relationship</th>
              <th>Status</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="guest in listData?.guests"
              :key="guest.id"
              class="hover:bg-secondary"
            >
              <td>
                {{ guest.name || `— (${guest.householdNickname})` }}
              </td>
              <td class="capitalize">
                {{ guest.relationshipType.replace(/_/g, " ") }}
              </td>
              <td>
                <Chip v-if="guest.isAttending === true" color="green">
                  Attending
                </Chip>
                <Chip v-else-if="guest.isAttending === false" color="red">
                  Not Attending
                </Chip>
                <Chip v-else color="yellow">Not Responded</Chip>
              </td>
              <td>
                {{ formatDate(guest.updatedAt) }}
              </td>
              <td>
                <button
                  class="button button-sm font-medium"
                  :aria-label="`Edit ${guest.name || guest.householdNickname}`"
                  @click="openEditModal(guest.id)"
                >
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else class="p-12 text-center">
      <p class="text-slate">No guests have been added yet.</p>
    </div>

    <EditGuestModal
      v-model:open="isEditModalOpen"
      :guest="selectedGuest"
      @success="onEditSuccess"
    />
  </DashboardContainer>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "updated"): void;
}>();

type SortOption = "name_asc" | "name_desc" | "updated_desc";

const currentPage = ref(1);
const isEditModalOpen = ref(false);
const currentSort = ref<SortOption>("updated_desc");
const selectedGuest = ref<{
  id: string;
  name: string | null;
  isAttending: boolean | null;
  householdNickname: string | null;
} | null>(null);

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Name (A-Z)", value: "name_asc" },
  { label: "Name (Z-A)", value: "name_desc" },
  { label: "Last Updated (Newest)", value: "updated_desc" },
];

const openEditModal = (id: string) => {
  const guest = listData.value?.guests.find((g) => g.id === id);
  if (!guest) return;
  selectedGuest.value = guest;
  isEditModalOpen.value = true;
};

const onEditSuccess = () => {
  refreshGuests();
  emit("updated");
};

const refreshGuests = () => {
  refresh();
};

defineExpose({
  refreshGuests,
});

const { data: listData, refresh } = await useFetch(
  () => "/api/admin/guests/list",
  {
    query: { page: currentPage, limit: 20, sort: currentSort },
  },
);

const subtitle = computed(() => {
  return formatResultsMessage(listData.value?.pagination);
});
</script>

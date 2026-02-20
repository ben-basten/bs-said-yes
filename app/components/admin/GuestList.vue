<template>
  <DashboardContainer
    title="Guest List"
    :subtitle
    :pagination="listData?.pagination"
    @next="currentPage++"
    @previous="currentPage = Math.max(1, currentPage - 1)"
  >
    <div v-if="listData?.guests && listData.guests.length > 0">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr>
              <th
                class="cursor-pointer select-none"
                @click="toggleSort('name')"
              >
                Name
                <span v-if="currentSort.startsWith('name_')">&#9662;</span>
                <span v-else-if="currentSort === 'name_desc'">&#9662;</span>
              </th>
              <th>Relationship</th>
              <th>Status</th>
              <th
                class="cursor-pointer select-none"
                @click="toggleSort('updated')"
              >
                Last Updated
                <span v-if="currentSort === 'updated_asc'">&#9652;</span>
                <span v-else-if="currentSort === 'updated_desc'">&#9662;</span>
              </th>
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

type SortValue = "name_asc" | "name_desc" | "updated_asc" | "updated_desc";

const currentPage = ref(1);
const currentSort = ref<SortValue>("updated_desc");
const isEditModalOpen = ref(false);
const selectedGuest = ref<{
  id: string;
  name: string | null;
  isAttending: boolean | null;
  householdNickname: string | null;
} | null>(null);

const openEditModal = (id: string) => {
  const guest = listData.value?.guests.find((g) => g.id === id);
  if (!guest) return;
  selectedGuest.value = guest;
  isEditModalOpen.value = true;
};

const toggleSort = (column: "name" | "updated") => {
  const asc = `${column}_asc` as SortValue;
  const desc = `${column}_desc` as SortValue;
  currentSort.value = currentSort.value === desc ? asc : desc;
  currentPage.value = 1;
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

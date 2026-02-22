<template>
  <DashboardContainer
    title="Households"
    :subtitle
    :pagination="listData?.pagination"
    @next="handlePagination(1)"
    @previous="handlePagination(-1)"
  >
    <template #actions>
      <button class="button button-sm" @click="openCreateModal">Create</button>
    </template>

    <div v-if="pending && !listData" class="p-12 text-center">
      <p class="text-slate italic animate-pulse">Loading households...</p>
    </div>

    <div v-else-if="listData?.items && listData.items.length > 0">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr>
              <th>Nickname</th>
              <th>Invitation Sent</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody ref="tbodyRef">
            <tr
              v-for="household in listData.items"
              :key="household.id"
              tabindex="-1"
              class="hover:bg-secondary transition-colors"
            >
              <td>
                {{ household.nickname }}
              </td>
              <td>
                <Chip :color="household.inviteSent ? 'green' : 'yellow'">
                  {{ household.inviteSent ? "Sent" : "Pending" }}
                </Chip>
              </td>
              <td>
                {{ formatDate(household.updatedAt) }}
              </td>
              <td>
                <button
                  class="button button-sm font-medium"
                  :aria-label="`Edit ${household.nickname}`"
                  @click="openEditModal(household)"
                >
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="p-12 text-center text-slate">No households found.</div>

    <EditHouseholdModal
      v-model:open="isEditModalOpen"
      :household="selectedHousehold"
      @success="refresh"
    />

    <CreateHouseholdModal
      v-model:open="isCreateModalOpen"
      @success="handleHouseholdSuccess"
    />
  </DashboardContainer>
</template>

<script setup lang="ts">
import type { Household } from "~/types/Household";

const isEditModalOpen = ref(false);
const isCreateModalOpen = ref(false);
const selectedHousehold = ref<Household | null>(null);
const tbodyRef = ref<HTMLTableSectionElement | null>(null);
let isPaginating = false;

const currentPage = ref(1);
const {
  data: listData,
  pending,
  refresh,
} = await useFetch(() => `/api/admin/households/list`, {
  query: { page: currentPage, limit: 20 },
  watch: [currentPage],
});

watch(listData, async () => {
  if (isPaginating) {
    await nextTick();
    if (tbodyRef.value) {
      const firstRow = tbodyRef.value.querySelector("tr");
      firstRow?.focus({ preventScroll: true });
      firstRow?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    isPaginating = false;
  }
});

const emit = defineEmits<{
  (e: "updated"): void;
}>();

const handleHouseholdSuccess = () => {
  emit("updated");
  refresh();
};

const openEditModal = (household: Household) => {
  selectedHousehold.value = household;
  isEditModalOpen.value = true;
};

const openCreateModal = () => {
  isCreateModalOpen.value = true;
};

const handlePagination = (dir: 1 | -1) => {
  currentPage.value = Math.max(1, currentPage.value + dir);
  isPaginating = true;
};

const subtitle = computed(() => {
  return formatResultsMessage(listData.value?.pagination);
});
</script>

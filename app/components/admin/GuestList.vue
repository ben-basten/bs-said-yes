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
              <th>Name</th>
              <th>Relationship</th>
              <th>Status</th>
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
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else class="p-12 text-center">
      <p class="text-slate">No guests have been added yet.</p>
    </div>
  </DashboardContainer>
</template>

<script setup lang="ts">
const currentPage = ref(1);

const refreshGuests = () => {
  refresh();
};

defineExpose({
  refreshGuests,
});

const { data: listData, refresh } = await useFetch(
  () => "/api/admin/guests/list",
  {
    query: { page: currentPage, limit: 20 },
  },
);

const subtitle = computed(() => {
  return formatResultsMessage(listData.value?.pagination);
});
</script>

<template>
  <DashboardContainer
    title="Guest List"
    :subtitle="resultsMessage"
    :pagination="listData?.pagination"
    @next="currentPage++"
    @previous="currentPage = Math.max(1, currentPage - 1)"
  >
    <div v-if="listData?.guests && listData.guests.length > 0">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate">
              <th
                class="px-6 py-3 text-left text-xs font-medium text-slate uppercase tracking-wider"
              >
                Name
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-slate uppercase tracking-wider"
              >
                Relationship
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-slate uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-secondary">
            <tr
              v-for="guest in listData?.guests"
              :key="guest.id"
              class="hover:bg-secondary"
            >
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground"
              >
                {{ guest.name || `— (${guest.householdNickname})` }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-slate capitalize"
              >
                {{ guest.relationshipType.replace(/_/g, " ") }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  v-if="guest.isAttending === true"
                  class="px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-foreground"
                >
                  Attending
                </span>
                <span
                  v-else-if="guest.isAttending === false"
                  class="px-3 py-1 rounded-full text-xs font-semibold bg-red-900 text-background"
                >
                  Not Attending
                </span>
                <span
                  v-else
                  class="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500 text-foreground"
                >
                  Not Responded
                </span>
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

const { data: listData } = await useFetch(() => "/api/admin/guests/list", {
  query: { page: currentPage, limit: 20 },
});

const resultsMessage = computed(() => {
  if (!listData.value?.pagination) {
    return "No guests found.";
  }

  const total = listData.value.pagination.total;
  if (total === 0) {
    return "Showing 0 guests.";
  }

  const start =
    (listData.value.pagination.page - 1) * listData.value.pagination.pageSize +
    1;
  const end = Math.min(
    listData.value.pagination.page * listData.value.pagination.pageSize,
    listData.value.pagination.total,
  );
  return `Showing ${start}-${end} of ${total} guests.`;
});
</script>

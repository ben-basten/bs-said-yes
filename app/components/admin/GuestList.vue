<template>
  <div class="bg-background border border-slate rounded-lg shadow">
    <div class="p-6 border-b border-slate">
      <Heading as="h2" variant="h4">Guest List</Heading>
      <p class="text-sm text-slate mt-1">
        {{ resultsMessage }}
      </p>
    </div>

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

    <div
      class="px-6 py-4 border-t border-slate flex items-center justify-between"
    >
      <button
        :disabled="currentPage === 1"
        class="px-4 py-2 text-sm font-medium text-foreground bg-background border border-slate rounded-lg hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        @click="currentPage = Math.max(1, currentPage - 1)"
      >
        Previous
      </button>
      <span class="text-sm text-slate">
        Page {{ listData?.pagination?.page ?? 1 }} of
        {{ listData?.pagination?.totalPages ?? 1 }}
      </span>
      <button
        :disabled="
          !listData?.pagination || currentPage >= listData.pagination.totalPages
        "
        class="px-4 py-2 text-sm font-medium text-foreground bg-background border border-slate rounded-lg hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        @click="currentPage = currentPage + 1"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const currentPage = ref(1);

const { data: listData, refresh } = await useFetch(
  () => `/api/admin/guests/list?page=${currentPage.value}&limit=10`,
);

watch(currentPage, async () => {
  await refresh();
});

const resultsMessage = computed(() => {
  if (!listData.value?.pagination) {
    return "No guests found.";
  }

  const start =
    (listData.value.pagination.page - 1) * listData.value.pagination.pageSize +
    1;
  const end = Math.min(
    listData.value.pagination.page * listData.value.pagination.pageSize,
    listData.value.pagination.total,
  );
  return `Showing ${start}-${end} of ${listData.value.pagination.total} guests.`;
});
</script>

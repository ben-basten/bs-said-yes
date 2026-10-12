<template>
  <DashboardContainer title="Accommodation Requests">
    <div v-if="accommodationRequests.length > 0">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate text-left">
              <th
                class="px-6 py-3 text-xs font-medium text-slate uppercase tracking-wider w-1/4"
              >
                Household
              </th>
              <th
                class="px-6 py-3 text-xs font-medium text-slate uppercase tracking-wider"
              >
                Request
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-secondary">
            <tr
              v-for="rsvp in accommodationRequests"
              :key="rsvp.id"
              class="hover:bg-secondary"
            >
              <td class="px-6 py-4 text-sm font-medium text-foreground">
                {{ rsvp.householdNickname }}
              </td>
              <td class="px-6 py-4 text-sm text-slate whitespace-pre-wrap">
                {{ rsvp.accommodations }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else class="p-12 text-center text-slate">
      No accommodation requests yet.
    </div>
  </DashboardContainer>

  <DashboardContainer title="Song Recommendations">
    <div v-if="songRequests.length > 0">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate text-left">
              <th
                class="px-6 py-3 text-xs font-medium text-slate uppercase tracking-wider w-1/4"
              >
                Household
              </th>
              <th
                class="px-6 py-3 text-xs font-medium text-slate uppercase tracking-wider"
              >
                Song(s)
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-secondary">
            <tr
              v-for="rsvp in songRequests"
              :key="rsvp.id"
              class="hover:bg-secondary"
            >
              <td class="px-6 py-4 text-sm font-medium text-foreground">
                {{ rsvp.householdNickname }}
              </td>
              <td class="px-6 py-4 text-sm text-slate whitespace-pre-wrap">
                {{ rsvp.songRecommendations }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else class="p-12 text-center text-slate">
      No song recommendations yet.
    </div>
  </DashboardContainer>
</template>

<script setup lang="ts">
interface RsvpResponse {
  id: string;
  householdNickname: string;
  accommodations: string | null;
  songRecommendations: string | null;
  updatedAt: string;
}

const { data: responses } = await useFetch<RsvpResponse[]>(
  "/api/admin/rsvp/list",
);

const accommodationRequests = computed(
  () =>
    responses.value?.filter(
      (r) => r.accommodations && r.accommodations.trim() !== "",
    ) ?? [],
);

const songRequests = computed(
  () =>
    responses.value?.filter(
      (r) => r.songRecommendations && r.songRecommendations.trim() !== "",
    ) ?? [],
);
</script>

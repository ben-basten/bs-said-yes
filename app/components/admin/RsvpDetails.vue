<template>
  <div class="space-y-12">
    <!-- Accommodations Section -->
    <section>
      <div class="bg-background border border-slate rounded-lg shadow">
        <div class="p-6 border-b border-slate">
          <Heading as="h2" variant="h4">Accommodation Requests</Heading>
          <p class="text-sm text-slate mt-1">
            Special requirements and dietary notes from guests.
          </p>
        </div>

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
      </div>
    </section>

    <!-- Song Requests Section -->
    <section>
      <div class="bg-background border border-slate rounded-lg shadow">
        <div class="p-6 border-b border-slate">
          <Heading as="h2" variant="h4">Song Recommendations</Heading>
          <p class="text-sm text-slate mt-1">
            Tracks suggested by guests to play at the wedding.
          </p>
        </div>

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
      </div>
    </section>
  </div>
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

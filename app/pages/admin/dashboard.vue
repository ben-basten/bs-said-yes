<template>
  <ContentContainer class="mt-10 mb-vertical-lg">
    <Heading as="h1" variant="h2" class="mb-6">Manage Guests</Heading>

    <div class="flex flex-col gap-y-vertical">
      <StatusCards
        :attending="statusData?.status?.attending ?? null"
        :not-attending="statusData?.status?.notAttending ?? null"
        :not-responded="statusData?.status?.notResponded ?? null"
      />
      <GuestList ref="guestRef" @updated="refreshStatus" />
      <HouseholdList @updated="onHouseholdUpdated" />
      <RsvpDetails />
    </div>
  </ContentContainer>
</template>

<script setup lang="ts">
import type { GuestList } from "#components";

definePageMeta({
  middleware: "authenticated",
  layout: "admin",
});

useHead({
  title: "Dashboard | Admin",
});

const onHouseholdUpdated = () => {
  guestRef.value?.refreshGuests();
  refreshStatus();
};

const guestRef = useTemplateRef<InstanceType<typeof GuestList> | null>(
  "guestRef",
);

const { data: statusData, refresh: refreshStatus } = await useFetch(
  "/api/admin/guests/status",
);
</script>

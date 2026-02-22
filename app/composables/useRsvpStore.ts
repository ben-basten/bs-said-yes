import type { InternalApi } from "nitropack";
import type { RsvpGuest } from "~/types/Guest";

type LookupResponse = InternalApi["/api/rsvp/lookup"]["get"];

export const useRsvpStore = defineStore("rsvp", () => {
  // Form state
  const currentStep = ref(1);
  const attendingIds = ref<string[]>([]);
  const accommodations = ref("");
  const songRequests = ref("");
  const plusOneName = ref("");

  // API response
  const self = ref<RsvpGuest>({} as RsvpGuest);
  const guests = ref<RsvpGuest[]>([]);

  const anonymousGuest = computed(() => {
    return guests.value.find(
      (g) => g.isAnonymous && attendingIds.value.includes(g.id),
    );
  });

  const reset = () => {
    currentStep.value = 1;
    self.value = {} as RsvpGuest;
    guests.value = [];
    attendingIds.value = [];
    accommodations.value = "";
    songRequests.value = "";
  };

  const nextStep = () => {
    if (currentStep.value < 5) {
      currentStep.value += 1;
    }
  };

  const previousStep = () => {
    if (currentStep.value > 1) {
      currentStep.value -= 1;
    }
  };

  const toBeginning = () => {
    currentStep.value = 2;
  };

  const toEnd = () => {
    currentStep.value = 5;
  };

  const isAttending = () => {
    return attendingIds.value.length > 0;
  };

  const setLookupResponse = (response: LookupResponse) => {
    self.value = response.self;
    guests.value = response.guests;

    // pre-fill attendance status
    const attending = response.guests
      .filter((g) => g.attending)
      .map((g) => g.id);
    if (response.self.attending) {
      attending.push(response.self.id);
    }
    attendingIds.value = attending;

    accommodations.value = response.accommodations || "";
    songRequests.value = response.songRecommendations || "";
  };

  return {
    accommodations,
    anonymousGuest,
    attendingIds,
    currentStep,
    guests,
    plusOneName,
    self,
    songRequests,
    isAttending,
    nextStep,
    previousStep,
    reset,
    setLookupResponse,
    toBeginning,
    toEnd,
  };
});

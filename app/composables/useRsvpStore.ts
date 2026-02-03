import type { InternalApi } from "nitropack";
import type { Guest } from "~/types/Guest";

type LookupResponse = InternalApi["/api/rsvp/lookup"]["get"];

export const useRsvpStore = defineStore("rsvp", () => {
  // Form state
  const currentStep = ref(1);
  const attendingIds = ref<string[]>([]);
  const accommodations = ref("");
  const songRequests = ref("");

  // API response
  const self = ref<Guest | null>(null);
  const guests = ref<Guest[]>([]);

  const reset = () => {
    currentStep.value = 1;
    self.value = null;
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
  };

  return {
    accommodations,
    attendingIds,
    currentStep,
    guests,
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

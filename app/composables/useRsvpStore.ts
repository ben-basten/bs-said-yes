export const useRsvpStore = defineStore("rsvp", () => {
  const currentStep = ref(1);

  const nextStep = () => {
    if (currentStep.value < 5) {
      currentStep.value += 1;
    }
  };

  return {
    currentStep,
    nextStep,
  };
});

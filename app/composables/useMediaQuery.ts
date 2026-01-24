export const useMediaQuery = (query: string) => {
  const isMatch = ref(false);
  let mediaQuery: MediaQueryList;

  const handleChange = (event: MediaQueryListEvent) => {
    isMatch.value = event.matches;
  };

  onMounted(() => {
    mediaQuery = window.matchMedia(query);
    isMatch.value = mediaQuery.matches;
    mediaQuery?.addEventListener("change", handleChange);
  });

  onUnmounted(() => {
    mediaQuery?.removeEventListener("change", handleChange);
  });

  return isMatch;
};

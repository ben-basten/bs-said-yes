import type { LocationQueryValue } from "vue-router";

export const getRedirectUrl = (
  to: LocationQueryValue | LocationQueryValue[] | undefined,
) => {
  const parsedTo = Array.isArray(to) ? to[0] : to;

  if (!parsedTo) {
    return "/";
  }

  try {
    return decodeURIComponent(parsedTo);
  } catch {
    return "/";
  }
};

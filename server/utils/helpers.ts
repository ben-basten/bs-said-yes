export const getInitials = (name: string | null): string => {
  if (!name) return "N/A";
  return name.split(" ").at(0) ?? "N/A";
};

export const getMemoryUrl = (origin: string, id: string) => {
  return `${origin}/memory/${id}`;
};

export const isHouseholdAttending = (
  guests: { isAttending: boolean | null }[],
) => {
  if (guests.some((guest) => guest.isAttending === null)) return null;
  if (guests.some((guest) => guest.isAttending === true)) return true;
  return false;
};

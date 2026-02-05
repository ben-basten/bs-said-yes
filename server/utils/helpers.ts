export const getInitials = (name: string | null): string => {
  if (!name) return "N/A";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};

export const getMemoryUrl = (origin: string, id: string) => {
  return `${origin}/memory/${id}`;
};

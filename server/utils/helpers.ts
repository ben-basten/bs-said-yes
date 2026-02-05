export const getInitials = (name: string | null): string => {
  if (!name) return "N/A";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};

export const getMemoryUrl = (id: string) => {
  const { domain } = useRuntimeConfig();
  return `https://${domain}/memory/${id}`;
};

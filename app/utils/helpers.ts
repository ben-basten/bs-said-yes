export const ariaCurrent = (route: string, currentRoute: string) => {
  return route === currentRoute ? "page" : undefined;
};

export const formatResultsMessage = (
  pagination: { total: number; page: number; limit: number } | undefined,
) => {
  if (!pagination) {
    return "No results found.";
  }

  const total = pagination.total;
  if (total === 0) {
    return "Showing 0 guests.";
  }

  const start = (pagination.page - 1) * pagination.limit + 1;
  const end = Math.min(pagination.page * pagination.limit, pagination.total);
  return `Showing ${start}-${end} of ${total} results.`;
};

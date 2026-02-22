import type { Pagination } from "~~/shared/types/Pagination";

export const ariaCurrent = (route: string, currentRoute: string) => {
  return route === currentRoute ? "page" : undefined;
};

export const formatResultsMessage = (pagination: Pagination | undefined) => {
  if (!pagination) {
    return "No results found.";
  }

  const total = pagination.total;
  if (total === 0) {
    return "Showing 0 results.";
  }

  const start = (pagination.page - 1) * pagination.limit + 1;
  const end = Math.min(pagination.page * pagination.limit, pagination.total);
  return `Showing ${start}-${end} of ${total} results.`;
};

export const formatDate = (raw: string) => {
  const date = new Date(raw);
  return date.toLocaleDateString();
};

export const formatRelationshipType = (type: string) => {
  switch (type) {
    case "primary":
      return "Primary";
    case "plus_one":
      return "Plus One";
    case "child":
      return "Child";
    default:
      return type;
  }
};

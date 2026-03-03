export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  sort?: string;
};

export type GuestSort =
  | "name_asc"
  | "name_desc"
  | "updated_desc"
  | "status_asc"
  | "status_desc";

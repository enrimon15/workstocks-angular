export interface PaginatedResponse<T> {
  elements: T[];
  response: Pagination;
}

export interface Pagination {
  pageSize: number;
  pageNumber: number;
  totalPages: number;
  totalElements: number;
}

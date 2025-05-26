export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    curr_page: number;
    total_page: number;
    limit: number;
    total: number;
  };
};

export type ApiResponse<T> = {
  data: T;
  message: string;
};

export type FetchFunctionWithPagination<T> = (
  page?: number,
  limit?: number,
  keyword?: string
) => Promise<PaginatedResponse<T>>;

export type FetchFunctionWithoutPagination<T> = (
  keyword?: string
) => Promise<ApiResponse<T[]>>;

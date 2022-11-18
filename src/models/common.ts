
export interface PaginationParams {
  _limit: number;
  _page: number;
  _totalRows: number;
}

export interface ListResponse<T> {
  data: T[];
  pagination?: PaginationParams;
}

export interface ResponseOrigin<T> {
  data: ListResponse<T> | T;
  status: string;
  statusText: string;
}

export interface ListParams {
  _limit?: number;
  page?: number;
  _sort?: string;
  _order?: 'asc' | 'desc';

  [key: string]: any;
  // Khai báo any cho các biến khác nếu có
}
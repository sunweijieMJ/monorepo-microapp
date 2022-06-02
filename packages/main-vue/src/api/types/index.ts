export * from './basic';

export interface CustomResponse<T = any, K = any> {
  readonly status: boolean;
  readonly message: string;
  data: T;
  origin?: K;
}

export interface PageList {
  pageNum?: number;
  pageSize?: number;
  pageRemark?: string;
  sortBy?: string;
}

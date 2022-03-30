export * from './basic';

export interface CustomResponse<T = any> {
  readonly status: boolean;
  readonly message: string;
  data: T;
  origin?: T;
}

export interface CommonPageList {
  pageNum?: number;
  pageSize?: number;
  pageRemark?: string;
  sortBy?: string;
}

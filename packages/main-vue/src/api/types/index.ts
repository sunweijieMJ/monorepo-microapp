import type {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';

export * from './basic';

export interface CustomRequestConfig extends AxiosRequestConfig {
  urlDict?: string | any[];
}

export type CustomRequestHeaders = AxiosRequestHeaders &
  Partial<{
    token: string;
    'x-language': string;
    showLoading: boolean;
    primitive: boolean;
    retryCount: number;
    retryDelay: number;
  }>;

export interface CustomResponse<T = any, D = any> {
  readonly status: boolean;
  readonly message: string;
  data: T;
  response: AxiosResponse<T, D>;
}

export interface PageList {
  pageNum?: number;
  pageSize?: number;
  pageRemark?: string;
  sortBy?: string;
}

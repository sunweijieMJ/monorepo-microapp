import axios from 'axios';
import type { AxiosRequestConfig, Canceler } from 'axios';
import {
  showFullScreenLoading,
  tryHideFullScreenLoading,
} from '../utils/loading';
import type { CustomRequestConfig } from './types';
import i18n from '@/plugin/i18n';

// 定义接口
type PendingList = Pick<
  AxiosRequestConfig,
  'url' | 'method' | 'params' | 'data'
> & { cancel: Canceler };

const { CancelToken } = axios;
const pendingList: PendingList[] = [];
const TIMEOUT = 10 * 60 * 1000;

// axios 实例
const instance = axios.create({
  timeout: TIMEOUT,
  responseType: 'json',
});

// 移除重复请求
const removePending = (config: CustomRequestConfig) => {
  for (let i = pendingList.length - 1; i >= 0; i--) {
    const item = pendingList[i];
    // 当前请求在数组中存在时执行函数体
    if (
      item.url === config.url &&
      item.method === config.method &&
      JSON.stringify(item.params) === JSON.stringify(config.params) &&
      JSON.stringify(item.data) === JSON.stringify(config.data)
    ) {
      // 执行取消操作
      item.cancel(`${i18n.global.t('BaseIntercept.t1')}`);
      // 从数组中移除记录
      pendingList.splice(i, 1);
    }
  }
};

// 添加请求拦截器
instance.interceptors.request.use(
  (request) => {
    if (request?.headers?.showLoading) {
      showFullScreenLoading();
    }

    removePending(request);

    if (!request.cancelToken) {
      request.cancelToken = new CancelToken((c: Canceler) => {
        pendingList.push({
          url: request.url,
          method: request.method,
          params: request.params,
          data: request.data,
          cancel: c,
        });
      });
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    if (response.config?.headers?.showLoading) {
      tryHideFullScreenLoading();
    }

    const errorCode = response?.data?.errorCode;
    switch (errorCode) {
      case '1020007':
        // 修改密码
        break;
      default:
        break;
    }

    return response;
  },
  async (error) => {
    if (error.config?.headers?.showLoading || axios.isCancel(error)) {
      tryHideFullScreenLoading();
    }

    const response = error.response;
    // 根据返回的code值来做不同的处理(和后端约定)
    switch (response?.status) {
      case 401:
        // token失效
        break;
      case 403:
        // 没有权限
        break;
      case 404:
        // 地址错误
        break;
      case 500:
        // 服务端错误
        break;
      case 503:
        // 服务端错误
        break;
      default:
        break;
    }

    /**
     * 超时重新请求
     */
    const config = error.config;

    // 再次请求次数,请求间隔时间
    const RETRY_COUNT = config?.headers?.retryCount ?? 0;
    const RETRY_DELAY = config?.headers?.retryDelay ?? 1000;

    if (config && RETRY_COUNT) {
      // 设置用于跟踪重试计数的变量
      config.retryCount = config.retryCount || 0;
      // 检查是否已经把重试的总数用完
      if (config.retryCount >= RETRY_COUNT) {
        return Promise.reject(response || { message: error.message });
      }
      // 增加重试计数
      config.retryCount++;
      // 创造新的Promise来处理指数后退
      const backOff = new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
        }, RETRY_DELAY);
      });
      // instance重试请求的Promise
      return backOff.then(() => instance(config));
    }

    // eslint-disable-next-line
    return Promise.reject(response || { message: error.message });
  }
);

export default instance;

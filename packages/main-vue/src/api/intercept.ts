import axios from 'axios';
import type { AxiosRequestConfig, Method, Canceler } from 'axios';
import { i18n } from '@/plugin';
import storage from '@/utils/storage';
import {
  showFullScreenLoading,
  tryHideFullScreenLoading,
} from '@/utils/loading';

// 定义接口
interface PendingList {
  url?: string;
  method?: Method;
  params: Record<string, string>;
  data: Record<string, any>;
  cancel: Canceler;
}

const pendingList: PendingList[] = [];
const { CancelToken } = axios;
// axios 实例
const instance = axios.create({
  timeout: 10 * 60 * 1000,
  responseType: 'json',
});

// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
  pendingList.forEach((item, index) => {
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
      pendingList.splice(index, 1);
    }
  });
};

// 添加请求拦截器
instance.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    if (request?.headers?.showLoading) {
      showFullScreenLoading(request?.headers?.targetDom as string);
    }

    removePending(request);
    request.cancelToken = new CancelToken((c: Canceler) => {
      pendingList.push({
        url: request.url,
        method: request.method as Method,
        params: request.params,
        data: request.data,
        cancel: c,
      });
    });
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
  (error) => {
    if (error.config?.headers?.showLoading) {
      tryHideFullScreenLoading();
    }

    const response = error.response;
    // 根据返回的code值来做不同的处理(和后端约定)
    console.log(response?.status);
    switch (response?.status) {
      case 401:
        // token失效
        storage('sessionstorage').remove('token');
        storage('localstorage').remove('token');
        storage('localstorage').remove('vuex');
        window.location.href = `/login?redirect=${encodeURIComponent(
          window.location.href
        )}`;
        break;
      case 403:
        // 没有权限
        // Vue.prototype.$serveError({ type: '403' });
        break;
      case 404:
        // 接口地址错误
        // Vue.prototype.$serveError({ type: '404' });
        break;
      case 500:
        // 服务端错误
        // Vue.prototype.$serveError({ type: '500' });
        break;
      case 503:
        // 服务端错误
        // Vue.prototype.$serveError({ type: '503' });
        break;
      default:
        break;
    }

    // 超时重新请求
    const config = error.config;
    // 全局的请求次数,请求的间隙
    const [RETRY_COUNT, RETRY_DELAY] = [0, 1000];

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
      const backoff = new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
        }, RETRY_DELAY || 1);
      });
      // instance重试请求的Promise
      return backoff.then(() => instance(config));
    }

    // eslint-disable-next-line
    return Promise.reject(response || { message: error.message });
  }
);

export default instance;

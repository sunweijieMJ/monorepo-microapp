/**
 * axios基础构建
 * @date 2021-4-9
 */

import { ElMessage } from 'element-plus';
import type { AxiosRequestHeaders, AxiosRequestConfig } from 'axios';
import getUrl from './config';
import instance from './intercept';
import type { CustomResponse } from './types';
import { i18n } from '@/plugin';
import storage from '@/utils/storage';

class Abstract {
  protected baseURL = process.env.VUE_APP_BASEURL;

  protected headers = {
    ContentType: 'application/json;charset=UTF-8',
  };

  private apiAxios({
    baseURL = this.baseURL,
    headers,
    method,
    url,
    data,
    params,
    responseType,
  }: AxiosRequestConfig): Promise<CustomResponse> {
    const newHeaders: AxiosRequestHeaders = {
      'x-language': storage('localstorage').get('i18n'),
      showLoading: true,
      token:
        storage('sessionstorage').get('token') ||
        storage('localstorage').get('token'),
      ...this.headers,
      ...headers,
    };

    // url解析
    const urlArr = (url as string).split('.');
    url = getUrl(urlArr[0], urlArr[1]);

    return new Promise((resolve, reject) => {
      instance({
        baseURL,
        headers: newHeaders,
        method,
        url,
        params,
        data,
        responseType,
      })
        .then((res) => {
          // 200:服务端业务处理正常结束
          if (res.status === 200) {
            if (res.data.success) {
              resolve({
                status: true,
                message: 'success',
                data: res.data?.data,
                origin: res.data,
              });
            } else {
              ElMessage.error(
                res.data?.errorMessage ||
                  `${url}${i18n.global.t('BaseAbstract.t1')}`
              );
              resolve({
                status: false,
                message:
                  res.data?.errorMessage ||
                  `${url}${i18n.global.t('BaseAbstract.t1')}`,
                data: res.data?.data,
                origin: res.data,
              });
            }
          } else {
            resolve({
              status: false,
              message:
                res.data?.errorMessage ||
                `${url}${i18n.global.t('BaseAbstract.t1')}`,
              data: null,
            });
          }
        })
        .catch((err) => {
          let message: string;
          switch (err.status) {
            case 401:
              message = `${i18n.global.t('BaseAbstract.t2')}`;
              break;
            default:
              message =
                err?.data?.errorMessage ||
                err?.message ||
                `${url}${i18n.global.t('BaseAbstract.t1')}`;
              break;
          }
          // Vue.prototype.$toast({ message });
          // eslint-disable-next-line
          reject({ status: false, message, data: null });
        });
    });
  }

  /**
   * GET类型的网络请求
   */
  protected getReq({
    baseURL,
    headers,
    url,
    data,
    params,
    responseType,
  }: AxiosRequestConfig) {
    return this.apiAxios({
      baseURL,
      headers,
      method: 'GET',
      url,
      data,
      params,
      responseType,
    });
  }

  /**
   * POST类型的网络请求
   */
  protected postReq({
    baseURL,
    headers,
    url,
    data,
    params,
    responseType,
  }: AxiosRequestConfig) {
    return this.apiAxios({
      baseURL,
      headers,
      method: 'POST',
      url,
      data,
      params,
      responseType,
    });
  }

  /**
   * PUT类型的网络请求
   */
  protected putReq({
    baseURL,
    headers,
    url,
    data,
    params,
    responseType,
  }: AxiosRequestConfig) {
    return this.apiAxios({
      baseURL,
      headers,
      method: 'PUT',
      url,
      data,
      params,
      responseType,
    });
  }

  /**
   * DELETE类型的网络请求
   */
  protected deleteReq({
    baseURL,
    headers,
    url,
    data,
    params,
    responseType,
  }: AxiosRequestConfig) {
    return this.apiAxios({
      baseURL,
      headers,
      method: 'DELETE',
      url,
      data,
      params,
      responseType,
    });
  }
}

export default Abstract;

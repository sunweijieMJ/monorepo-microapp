/**
 * axios基础构建
 */
import { message } from 'antd';
import { defineMessage } from 'react-intl';
import storage from '../utils/storage';
import translUrlDict from './config';
import instance from './intercept';
import type { CustomRequestConfig, CustomResponse } from './types';

class Abstract {
  protected baseURL = '';

  protected headers = {
    'Content-Type': 'application/json;charset=UTF-8',
  };

  private get defaultBaseURL() {
    return storage('sessionStorage').get('VUE_APP_BaseURL');
  }

  private apiAxios({
    baseURL = this.baseURL || this.defaultBaseURL,
    headers,
    method,
    url,
    urlDict,
    data,
    params,
    responseType,
    cancelToken,
    onUploadProgress,
    onDownloadProgress,
  }: CustomRequestConfig): Promise<CustomResponse> {
    // token
    const token =
      storage('sessionStorage').get('token') ||
      storage('localStorage').get('token');
    // 激活语言和默认语言
    const activeLanguage = storage('localStorage').get('i18n');
    const xLanguage = activeLanguage;

    const newHeaders = {
      'x-language': xLanguage,
      showLoading: true,
      token,
      ...this.headers,
      ...headers,
    };

    // url字典解析
    if (!url) {
      if (Array.isArray(urlDict)) {
        url = translUrlDict(...urlDict);
      } else {
        url = translUrlDict(urlDict);
      }
    }

    return new Promise((resolve, reject) => {
      instance({
        baseURL,
        headers: newHeaders,
        method,
        url,
        params,
        data,
        responseType,
        cancelToken,
        onUploadProgress,
        onDownloadProgress,
      })
        .then((response) => {
          if (responseType === 'blob' || response.config.headers?.primitive) {
            resolve({
              status: true,
              message: 'success',
              data: response?.data,
              response,
            });
            return;
          }
          // 200:服务端业务处理正常结束
          if (response.status === 200 && response.data.success) {
            resolve({
              status: true,
              message: 'success',
              data: response.data?.data,
              response,
            });
          } else {
            resolve({
              status: false,
              message:
                response.data?.errorMessage ||
                `${defineMessage({
                  id: 'api.fail',
                })}`,
              data: response.data?.data,
              response,
            });
            message.error(
              response.data?.errorMessage ||
                `${defineMessage({
                  id: 'api.fail',
                })}`
            );
          }
        })
        .catch((err) => {
          let message: string;
          switch (err.status) {
            case 401:
              message = `${defineMessage({
                id: 'api.timeout',
              })}`;
              break;
            default:
              message =
                err?.data?.errorMessage ||
                err?.message ||
                `${defineMessage({
                  id: 'api.fail',
                })}`;
              break;
          }
          // eslint-disable-next-line
          reject({ status: false, message, data: null, response: err });
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
    urlDict,
    data,
    params,
    responseType,
    cancelToken,
    onUploadProgress,
    onDownloadProgress,
  }: CustomRequestConfig) {
    return this.apiAxios({
      baseURL,
      headers,
      method: 'GET',
      url,
      urlDict,
      data,
      params,
      responseType,
      cancelToken,
      onUploadProgress,
      onDownloadProgress,
    });
  }

  /**
   * POST类型的网络请求
   */
  protected postReq({
    baseURL,
    headers,
    url,
    urlDict,
    data,
    params,
    responseType,
    cancelToken,
    onUploadProgress,
    onDownloadProgress,
  }: CustomRequestConfig) {
    return this.apiAxios({
      baseURL,
      headers,
      method: 'POST',
      url,
      urlDict,
      data,
      params,
      responseType,
      cancelToken,
      onUploadProgress,
      onDownloadProgress,
    });
  }

  /**
   * PUT类型的网络请求
   */
  protected putReq({
    baseURL,
    headers,
    url,
    urlDict,
    data,
    params,
    responseType,
    cancelToken,
    onUploadProgress,
    onDownloadProgress,
  }: CustomRequestConfig) {
    return this.apiAxios({
      baseURL,
      headers,
      method: 'PUT',
      url,
      urlDict,
      data,
      params,
      responseType,
      cancelToken,
      onUploadProgress,
      onDownloadProgress,
    });
  }

  /**
   * DELETE类型的网络请求
   */
  protected deleteReq({
    baseURL,
    headers,
    url,
    urlDict,
    data,
    params,
    responseType,
    cancelToken,
    onUploadProgress,
    onDownloadProgress,
  }: CustomRequestConfig) {
    return this.apiAxios({
      baseURL,
      headers,
      method: 'DELETE',
      url,
      urlDict,
      data,
      params,
      responseType,
      cancelToken,
      onUploadProgress,
      onDownloadProgress,
    });
  }
}

export default Abstract;

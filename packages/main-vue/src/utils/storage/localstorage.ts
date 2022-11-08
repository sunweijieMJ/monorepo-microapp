export type ExpireObj = {
  value: string;
  time: string | number | Date;
};

/**
 * @description LocalStorage的封装
 */
class LocalStorageAPI {
  /**
   * @description 设置localStorage
   * @param key 键
   * @param value 值
   */
  static set(key: string, value: string) {
    try {
      localStorage.setItem(key, value);
    } catch (e: any) {
      if (e.name === 'QuotaExceededError') {
        throw new Error('Out of Memory Limit Localstorage');
      } else {
        throw new Error(e.name);
      }
    }
  }

  /**
   * @description 获取localStorage
   * @param key 键
   */
  static get(key: string) {
    return localStorage.getItem(key) ?? '';
  }

  /**
   * @description 移除localStorage
   * @param key 键
   */
  static remove(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * @description 设置localStorage(含过期时间)
   * @param key 键
   * @param value 值
   * @param expire 过期时间
   */
  static setExpire(key: string, value: string, expire: ExpireObj['time']) {
    let expireTime = '';
    if (expire) {
      expireTime = new Date(expire).toString();
    }

    return LocalStorageAPI.set(
      key,
      JSON.stringify({ value, time: expireTime })
    );
  }

  /**
   * @description 获取localStorage(含过期时间)
   * @param key 键
   */
  static getExpire(key: string) {
    try {
      const dataObj: ExpireObj = JSON.parse(LocalStorageAPI.get(key));
      if (new Date(dataObj.time).getTime() - new Date().getTime() > 0) {
        return dataObj.value;
      }
    } catch (error) {
      return '';
    }
    return '';
  }
}

export default LocalStorageAPI;

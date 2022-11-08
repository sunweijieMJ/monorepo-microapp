/**
 * @description SessionStorage的封装
 */

class SessionStorageAPI {
  /**
   * @description 设置sessionStorage
   * @param key 键
   * @param value 值
   */
  static set(key: string, value: string) {
    return sessionStorage.setItem(key, value);
  }

  /**
   * @description 获取sessionStorage
   * @param key 键
   */
  static get(key: string) {
    return sessionStorage.getItem(key) ?? '';
  }

  /**
   * @description 移除sessionStorage
   * @param key 键
   */
  static remove(key: string) {
    return sessionStorage.removeItem(key);
  }
}

export default SessionStorageAPI;

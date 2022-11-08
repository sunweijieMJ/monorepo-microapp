/**
 * @description Cookie的封装
 */

class CookieAPI {
  /**
   * @description 设置cookie
   * @param key 键
   * @param value 值
   * @param [expire] 过期时间
   * @param [domain] 域名
   * @param [path] 路径
   */
  static set(
    key: string,
    value: string,
    expire: string | number | Date = '',
    domain = '',
    path = '/'
  ) {
    let expireTime = '';
    if (expire) {
      expireTime = new Date(expire).toUTCString();
    }
    document.cookie = `${key}=${encodeURIComponent(
      value
    )}; expires=${expireTime};domain=${domain};path=${path}`;
  }

  /**
   * @description 获取cookie
   * @param key 键
   */
  static get(key: string) {
    if (document.cookie.length > 0) {
      let cStart = document.cookie.indexOf(`${key}=`);
      if (cStart !== -1) {
        cStart = cStart + key.length + 1;
        let cEnd = document.cookie.indexOf(';', cStart);
        if (cEnd === -1) cEnd = document.cookie.length;
        return decodeURIComponent(document.cookie.substring(cStart, cEnd));
      }
    }
    return '';
  }

  /**
   * @description 移除cookie
   * @param key 键
   */
  static remove(key: string) {
    CookieAPI.set(key, '', new Date(0).toUTCString());
  }
}

export default CookieAPI;

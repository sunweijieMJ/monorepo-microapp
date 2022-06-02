/**
 * 存储封装对外提供统一的方法及接口使用
 * Cookie 存储到客户端
 */
class CookieAPI {
  static set(key: string, value: string, expire = 3600, path = '/'): void {
    const date = new Date();
    date.setSeconds(date.getSeconds() + expire);
    document.cookie = `${key}=${encodeURIComponent(
      value
    )}; expires=${date.toUTCString()}; Path=${path}`;
  }

  static get(key: string): string {
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

  static remove(key: string): void {
    CookieAPI.set(key, '', -1);
  }
}

export default CookieAPI;

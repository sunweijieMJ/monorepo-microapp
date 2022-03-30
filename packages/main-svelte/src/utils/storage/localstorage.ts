/**
 * 存储封装对外提供统一的方法及接口使用
 * Localstorage 存储到客户端
 */
class LocalStorageAPI {
  static set(key: string, value: string): void {
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

  static get(key: string): string {
    return localStorage.getItem(key) ?? '';
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }

  static setExpire(key: string, value: string, expire: number): void {
    const currTime = new Date().getTime();
    return LocalStorageAPI.set(
      key,
      JSON.stringify({ val: value, time: currTime + expire })
    );
  }

  static getExpire(key: string): string {
    const val: string = LocalStorageAPI.get(key);
    const dataObj = JSON.parse(val);
    if (new Date().getTime() - dataObj.time > 0) {
      return dataObj.val;
    }
    return '';
  }
}

export default LocalStorageAPI;

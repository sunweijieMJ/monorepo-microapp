import CookieAPI from './cookie';
import IndexedDBAPI from './indexedDB';
import LocalStorageAPI from './localStorage';
import SessionStorageAPI from './sessionStorage';

const UseStoreObj = {
  indexedDB: IndexedDBAPI,
  cookie: CookieAPI,
  sessionStorage: SessionStorageAPI,
  localStorage: LocalStorageAPI,
};

const StorageApi = <T extends keyof typeof UseStoreObj>(type: T) => {
  return UseStoreObj[type];
};

export const indexedDB = IndexedDBAPI;
export const cookie = CookieAPI;
export const sessionStorage = SessionStorageAPI;
export const localStorage = LocalStorageAPI;

/**
 * @description 统一封装对外暴露的storage接口
 */
export default StorageApi;

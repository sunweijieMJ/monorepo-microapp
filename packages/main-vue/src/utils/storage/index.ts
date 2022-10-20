/**
 * 统一封装对外的storage接口
 */
import CookieAPI from './cookie';
import IndexedDBAPI from './indexDB';
import LocalStorageAPI from './localstorage';
import SessionStorageAPI from './sessionstorage';

const UseStoreObj = {
  indexDB: IndexedDBAPI,
  cookie: CookieAPI,
  sessionstorage: SessionStorageAPI,
  localstorage: LocalStorageAPI,
};

export const indexDB = IndexedDBAPI;
export const cookie = CookieAPI;
export const sessionstorage = SessionStorageAPI;
export const localstorage = LocalStorageAPI;

export default <T extends keyof typeof UseStoreObj>(type: T) => {
  return UseStoreObj[type];
};

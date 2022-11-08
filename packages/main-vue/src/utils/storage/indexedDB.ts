export type DBTable = {
  dbName: string;
  tables: string[];
  version?: number;
};

/**
 * @description IndexedDB的封装
 */
class IndexedDB {
  dbName: DBTable['dbName']; // 数据库名称
  tables: DBTable['tables']; // 表名称
  version: DBTable['version']; // 版本号

  storage: IDBDatabase | null = null;

  constructor(options: DBTable) {
    const { dbName, tables, version = 1 } = options;
    this.dbName = dbName;
    this.tables = tables;
    this.version = version;
  }

  /**
   * @description 打开数据库
   */
  openDB() {
    return new Promise<Event>((resolve, reject) => {
      const { indexedDB } = window;
      if (!indexedDB) {
        console.error('你的浏览器不支持indexedDB');
        return;
      }
      if (this.tables?.length < 1) {
        console.error('表名不能为空');
        return;
      }
      const request = indexedDB.open(this.dbName, this.version);
      // 打开数据库成功
      request.onsuccess = (event) => {
        this.storage = (event.target as IDBRequest<IDBDatabase>)?.result;
        resolve(event);
      };
      // 打开数据库失败
      request.onerror = (event) => {
        console.error(
          `打开数据库失败: ${
            (event.currentTarget as IDBRequest<IDBDatabase>)?.error?.message
          }`
        );
        reject(event);
      };
      // 创建和维护数据表时调用
      request.onupgradeneeded = (event) => {
        this.storage = (event.target as IDBRequest<IDBDatabase>)?.result;
        this.tables.forEach((table) => {
          if (!this.storage?.objectStoreNames.contains(table)) {
            this.storage?.createObjectStore(table);
          }
        });
      };
    });
  }

  /**
   * @description 获取数据库对象
   */
  getDB() {
    return this.storage;
  }

  /**
   * @description 新增或更新数据到指定的表和主键中
   * @param table 表名
   * @param key 主键
   * @param value 值
   */
  setItem(table: string, key: string, value: any) {
    return new Promise<Event>((resolve, reject) => {
      const transaction = (this.storage as IDBDatabase).transaction(
        table,
        'readwrite'
      );
      const store = transaction.objectStore(table);
      const request = store.put(value, key);
      request.onsuccess = (event) => {
        resolve(event);
      };
      request.onerror = (event) => {
        reject(event);
      };
    });
  }

  /**
   * @description 获取当前数据库下指定表和主键所对应的值
   * @param table 表名
   * @param key 主键,key为null返回所有记录
   */
  getItem<T = any>(table: string, key: string | null) {
    return new Promise<T>((resolve, reject) => {
      // 第二个参数可以省略
      const transaction = (this.storage as IDBDatabase).transaction(
        table,
        'readwrite'
      );
      const store = transaction.objectStore(table);
      let request = null;
      if (key) {
        request = store.get(key);
      } else {
        request = store.getAll();
      }

      request.onsuccess = (event) => {
        resolve((event?.target as IDBRequest<T>)?.result);
      };
      request.onerror = (event) => {
        reject(event);
      };
    });
  }

  /**
   * @description 删除指定表和主键中数据
   * @param table 表名
   * @param key 主键
   */
  deleteItem(table: string, key: string) {
    return new Promise<Event>((resolve, reject) => {
      const request = (this.storage as IDBDatabase)
        .transaction(table, 'readwrite')
        .objectStore(table)
        .delete(key);
      request.onsuccess = (event) => {
        resolve(event);
      };
      request.onerror = (event) => {
        reject(event);
      };
    });
  }

  /**
   * @description 清空表数据
   * @param table 表名
   */
  clear(table: string) {
    return new Promise<Event>((resolve, reject) => {
      const request = (this.storage as IDBDatabase)
        .transaction(this.dbName, 'readwrite')
        .objectStore(table)
        .clear();
      request.onsuccess = (event) => {
        resolve(event);
      };
      request.onerror = (event) => {
        reject(event);
      };
    });
  }

  /**
   * @description 关闭数据库连接
   */
  closeDB() {
    this.storage?.close();
  }

  /**
   * @description 删除数据库
   * @param dbName 数据库名称
   */
  static deleteDB(dbName: string) {
    window.indexedDB.deleteDatabase(dbName);
  }
}

export default IndexedDB;

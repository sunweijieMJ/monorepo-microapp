export type DBTable = {
  dbName: string;
  tables: string[];
  version?: number;
};

/**
 * IndexedDB封装
 */
class IndexedDB {
  dbName: string;

  tables: string[];

  version: number;

  callback?: () => void;

  storage: any;

  constructor(options: DBTable) {
    const { dbName, tables, version = 1 } = options;
    this.dbName = dbName;
    this.tables = tables;
    this.version = version;
  }

  /**
   * 打开数据库
   */
  openDB() {
    return new Promise((resolve, reject) => {
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
      request.onsuccess = (event: any) => {
        this.storage = event.target?.result;
        resolve(event);
      };
      // 打开数据库失败
      request.onerror = (event: any) => {
        console.error(`打开数据库失败: ${event.currentTarget?.error?.message}`);
        reject(event);
      };
      // 创建和维护数据表时调用
      request.onupgradeneeded = (event: any) => {
        this.storage = event.target?.result;
        this.tables.forEach((table) => {
          if (!this.storage.objectStoreNames.contains(table)) {
            this.storage.createObjectStore(table);
          }
        });
      };
    });
  }

  /**
   * 获取数据库对象
   */
  getDB() {
    return this.storage;
  }

  /**
   * 新增或更新数据到指定的表和主键中
   * @param table 表名
   * @param key 主键
   * @param value 值
   */
  setItem(table: string, key: string, value: any) {
    return new Promise((resolve, reject) => {
      const transaction = this.storage.transaction(table, 'readwrite');
      const store = transaction.objectStore(table);
      const request = store.put(value, key);
      request.onsuccess = (event: any) => {
        resolve(event);
      };
      request.onerror = (event: any) => {
        reject(event);
      };
    });
  }

  /**
   * 获取当前数据库下指定表和主键对应的值,通过回调函数返回数据
   * @param table 表名
   * @param key 主键,key为null返回所有记录
   */
  getItem(table: string, key: string | null) {
    return new Promise((resolve, reject) => {
      // 第二个参数可以省略
      const transaction = this.storage.transaction(table, 'readwrite');
      const store = transaction.objectStore(table);
      let request = null;
      if (key) {
        request = store.get(key);
      } else {
        request = store.getAll();
      }

      request.onsuccess = (event: any) => {
        resolve(event?.target?.result);
      };
      request.onerror = (event: any) => {
        reject(event);
      };
    });
  }

  /**
   * 根据主键删除指定表和主键中数据
   * @param table 表名
   * @param key 主键
   */
  deleteItem(table: string, key: string) {
    return new Promise((resolve, reject) => {
      const request = this.storage
        .transaction(table, 'readwrite')
        .objectStore(table)
        .delete(key);
      request.onsuccess = (event: any) => {
        resolve(event);
      };
      request.onerror = (event: any) => {
        reject(event);
      };
    });
  }

  /**
   * 清空表数据
   * @param table 表名
   */
  clear(table: string) {
    return new Promise((resolve, reject) => {
      const request = this.storage
        .transaction(this.dbName, 'readwrite')
        .objectStore(table)
        .clear();
      request.onsuccess = (event: any) => {
        resolve(event);
      };
      request.onerror = (event: any) => {
        reject(event);
      };
    });
  }

  /**
   * 关闭数据库连接
   */
  closeDB() {
    this.storage.close();
  }

  /**
   * 删除指定数据库
   * @param dbName 数据库名称
   */
  static deleteDB(dbName: string) {
    window.indexedDB.deleteDatabase(dbName);
  }
}

export default IndexedDB;

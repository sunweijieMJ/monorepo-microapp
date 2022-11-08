/**
 * 基础 API 集合类
 * 集成Abstract
 */
import Abstract from '../abstract';
import type { SystemParamValueList } from '../types';

class Basic extends Abstract {
  /**
   * 语言列表
   */
  getSystemParamValueList(data: SystemParamValueList) {
    return this.postReq({ urlDict: 'Custom.SystemParamValueList', data });
  }
}

// 单列模式返回对象
let instance;
export default (() => {
  if (instance) return instance;
  instance = new Basic();
  return instance;
})();

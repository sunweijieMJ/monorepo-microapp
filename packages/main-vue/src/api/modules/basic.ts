/**
 * 基础 API 集合类
 * 集成Abstract
 * @date 2020-5-29
 */
import Abstract from '../abstract';
import {
  SystemParamValueList,
  TranslateMultipleWord,
  AuthLogin,
  ModifyPass,
  TaskList,
  TaskDetailList,
  MessageList,
  AssetList,
  GetDirectoryList,
  UpdateUser,
} from '../types';

class Basic extends Abstract {
  /**
   * 获取系统参数定义表列表
   */
  getSystemParamValueList(data: SystemParamValueList) {
    return this.postReq({ url: 'Basic.SystemParamValueList', data });
  }

  /**
   * 文字翻译
   */
  translateMultipleWord(data: TranslateMultipleWord, showLoading: boolean) {
    return this.postReq({
      url: 'Basic.TranslateMultipleWord',
      data,
      headers: {
        showLoading,
        targetDom: '.editi18n-dialog.el-dialog',
      },
    });
  }

  /**
   * 登录
   */
  authLogin(data: AuthLogin) {
    return this.postReq({
      url: 'Basic.AuthLogin',
      data,
      headers: {
        targetDom: '.el-form.login-form',
      },
    });
  }

  /**
   * 登出
   */
  authLoginOut(data = {}) {
    return this.postReq({ url: 'Basic.AuthLoginOut', data });
  }

  /**
   * 修改密码
   */
  modifyPass(data: ModifyPass) {
    return this.postReq({ url: 'Basic.ModifyPass', data });
  }

  /**
   * 获取修改密码的规则
   */
  getPassWordUpdateRule() {
    return this.getReq({ url: 'Basic.GetPassWordUpdateRule' });
  }

  /**
   * 用户信息
   */
  getUserInfo() {
    return this.getReq({ url: 'Basic.UserInfo' });
  }

  /**
   * 获取图形验证码
   */
  getGraphicCode() {
    return this.getReq({
      url: 'Basic.GraphicCode',
      headers: {
        targetDom: '.el-form.login-form',
      },
    });
  }

  /**
   * 菜单列表
   */
  getMenuList(data = {}) {
    return this.getReq({ url: 'Basic.MenuList', data });
  }

  /**
   * 获取数据字典
   */
  getDict(
    data: { systemProjectCode?: string; dictTypeList: Array<string> } = {
      systemProjectCode: 'oms',
      dictTypeList: [],
    }
  ) {
    return this.postReq({ url: 'Basic.GetDict', data });
  }

  /**
   * 查询所有任务Job带有分页列表
   */
  getTaskList(data: TaskList) {
    return this.postReq({ url: 'Basic.TaskList', data });
  }

  /**
   * 查询所有任务Job详情带有分页列表
   */
  getTaskDetailList(data: TaskDetailList) {
    return this.postReq({ url: 'Basic.TaskDetailList', data });
  }

  /**
   * 消息列表
   */
  getMessageList(data: MessageList) {
    return this.postReq({
      url: 'Basic.MessageList',
      data,
      headers: {
        targetDom: '.message-list.el-drawer',
      },
    });
  }

  /**
   * 消息列表标记已读
   */
  updateMessageStatus(data: { receiveStatus: string }) {
    return this.postReq({ url: 'Basic.UpdateMessageStatus', data });
  }

  /**
   * 根据damkey获得图片
   * @param {string} cateLogId
   */
  uploadImage(data: FormData) {
    return this.postReq({
      url: 'Basic.ImageUpload',
      headers: { ContentType: 'multipart/form-data' },
      data,
    });
  }

  /**
   * 素材库获取目录树
   */
  getMaterialLibraryTree(data = {}) {
    return this.postReq({ url: 'Basic.MaterialLibraryTree', data });
  }

  /**
   * 资产列表
   */
  getAssetList(data: AssetList) {
    return this.postReq({ url: 'Basic.AssetList', data });
  }

  /**
   * 获取会员体系选项
   */
  getMemberSystem() {
    return this.getReq({ url: 'Basic.MemberSystem' });
  }

  /**
   * 获取启用的目录列表
   */
  getDirectoryList(data: GetDirectoryList) {
    return this.postReq({ url: 'Basic.GetDirectoryList', data });
  }

  /**
   * 本地文件转链接
   */
  convertFileToUrl(data: File) {
    return this.postReq({
      url: 'Basic.ConvertFileToUrl',
      headers: { ContentType: 'multipart/form-data' },
      data,
    });
  }

  /**
   * 删除资产
   */
  deleteAsset(data: { idList: number[] }) {
    return this.postReq({ url: 'Basic.DeleteAsset', data });
  }

  /**
   * 编辑用户
   */
  updateUser(data: UpdateUser) {
    return this.postReq({ url: 'Basic.UpdateUser', data });
  }
}

// 单列模式返回对象
let instance;
export default (() => {
  if (instance) return instance;
  instance = new Basic();
  return instance;
})();

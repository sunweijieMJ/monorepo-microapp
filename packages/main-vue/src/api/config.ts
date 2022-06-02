/**
 * API 相关配置文件
 * API URL Dict api 字典
 */

export const urlDict: Record<string, Record<string, string>> = {
  Basic: {
    SystemParamValueList:
      'masterdataDomain/biz/v1/systemParamValue/getKeyValueList', // 获取系统参数定义表列表
    TranslateMultipleWord:
      'masterdataDomain/admin/v1/translate/wordTranslateMultiple', // 文字翻译

    AuthLogin: 'userDomain/admin/v1/user/login', // 登录
    AuthLoginOut: 'userDomain/admin/v1/user/logout', // 登出
    ModifyPass: 'userDomain/admin/v1/user/changePassword', // 修改密码
    GetPassWordUpdateRule: 'userDomain/admin/v1/user/getPassWordUpdateRule', // 获取修改密码的规则
    UserInfo: 'userDomain/admin/v1/user/profile', // 用户信息
    GraphicCode: 'userDomain/admin/v1/user/captcha', // 图形验证码
    MenuList: 'userDomain/admin/v1/resource/findMenus', // 菜单
    GetDict: 'masterdataDomain/admin/v1/dict/dictList', // 获取数据字典
    TaskList: 'taskDomain/admin/v1/taskJob/getTaskJobPageList', // 查询所有任务Job带有分页列表
    TaskDetailList: 'taskDomain/admin/v1/taskJob/getTaskDetailList', // 查询所有任务Job详情带有分页列表

    MessageList: 'taskDomain/admin/v1/messageReceive/getPageList', // 消息列表
    UpdateMessageStatus: 'taskDomain/admin/v1/messageReceive/updateStatus', // 消息列表标记已读

    ImageUpload: 'digitalasset/admin/v1/digitalasset/imageUpload', // 图片上传
    MaterialLibraryTree: 'digitalasset/admin/v1/digitalasset/getTree', // 素材库获取目录树
    AssetList: 'digitalasset/admin/v1/digitalasset/getImageAssetTree', // 资产列表
    MemberSystem: 'crm/admin/v1/mbrMembershipSystem/getMemberSystemList', // 获取会员体系选项

    GetDirectoryList: 'pim/admin/v1/catalog/getEnablePageList', // 获取启用的目录列表

    ConvertFileToUrl: 'digitalasset/biz/v1/digitalAsset/imageUploadEasy', // 本地文件转链接
    DeleteAsset: 'digitalasset/admin/v1/digitalasset/deleteImage', // 删除资产

    UpdateUser: 'userDomain/admin/v1/user/update', // 编辑用户
  },
};

export const getUrl = (biz: string, UrlName: string): string => {
  try {
    const bizKeys = Object.keys(urlDict);
    if (bizKeys.indexOf(biz) < 0) {
      throw new Error('biz not in Dict');
    }
    let hostname = urlDict[biz][UrlName];
    if (!hostname) {
      throw new Error('url not in Dict');
    }
    if (hostname?.startsWith('/')) {
      hostname = hostname.substr(1);
    }
    return hostname;
  } catch (err) {
    console.error(err);
    return '';
  }
};

export default getUrl;

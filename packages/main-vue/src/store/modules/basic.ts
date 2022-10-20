import { ElNotification } from 'element-plus';
import { Commit } from 'vuex';
import {
  BasicState,
  DirectoryList,
  LanguageList,
  MemberSystemOptionType,
  MenuList,
  PopupType,
  TagView,
  UserInfoType,
} from '../types';
import { basicApi } from '@/api';
import storage from '@/utils/storage';

export default {
  namespaced: true,
  actions: {
    // 激活异常弹窗
    activeErrorPage({ commit }: { commit: Commit }, data: PopupType) {
      commit('ACTIVE_ERROR_PAGE', data);
    },
    // 设置是否新用户首次登陆
    toggleInitLogin({ commit }: { commit: Commit }, data: boolean) {
      commit('TOGGLE_INIT_LOGIN', data);
    },
    // 修改密码弹窗
    toggleModifyPass({ commit }: { commit: Commit }, data: PopupType) {
      commit('TOGGLE_MODIFY_PASS', data);
    },
    // 切换任务中心状态
    setTaskDotStatus({ commit }: { commit: Commit }, data: boolean) {
      commit('SET_TASK_DOT_STATUS', data);
    },
    // 设置消息中心数量
    setMessageDotValue({ commit }: { commit: Commit }, data: boolean) {
      commit('SET_MESSAGE_DOT_VALUE', data);
    },
    // 切换当前语言
    toggleLanguage({ commit }: { commit: Commit }, data: string) {
      commit('TOGGLE_LANGUAGE', data);
    },
    // 切换菜单展开收起
    toggleMenuCollapse({ commit }: { commit: Commit }, data: boolean) {
      commit('TOGGLE_MENU_COLLAPSE', data);
    },
    // 切换消息展开收起
    toggleMessageCollapse({ commit }: { commit: Commit }, data: boolean) {
      commit('TOGGLE_MESSAGE_COLLAPSE', data);
    },
    // 获取用户信息
    async getUserInfo({ commit }: { commit: Commit }) {
      const res = await basicApi.getUserInfo();
      if (res.status) {
        // 账号状态: 0不用弹窗,1弹窗提示即将过期,2过期
        if (res.data.accountExpireStatus === 1) {
          if (!storage('localstorage').getExpire('accountExpireTime')) {
            ElNotification({
              title: `提示`,
              type: 'warning',
              message: '账号即将过期，请联系管理员处理',
              duration: 0,
            });
          }
          storage('localstorage').setExpire(
            'accountExpireTime',
            res.data.accountExpireTime,
            new Date(res.data.accountExpireTime).getTime()
          );
        } else if (res.data.accountExpireStatus === 2) {
          ElNotification({
            title: `提示`,
            type: 'warning',
            message: '账号即将过期，请联系管理员处理',
            duration: 0,
          });
        }

        // 密码状态: 0不用弹窗,1弹窗提示即将过期,2过期
        if (res.data.passwordStatus === 1) {
          if (!storage('localstorage').getExpire('passwordExpireTime')) {
            ElNotification({
              title: `提示`,
              type: 'warning',
              dangerouslyUseHTMLString: true,
              message:
                '系统已启用"定期修改密码提醒"功能。请您及时<a>修改您帐号的密码</a>。',
              duration: 0,
              onClick: () => {
                commit('TOGGLE_MODIFY_PASS', {
                  status: true,
                  type: 'required',
                });
              },
            });
          }
          storage('localstorage').setExpire(
            'passwordExpireTime',
            res.data.passwordExpireTime,
            new Date(res.data.passwordExpireTime).getTime()
          );
        } else if (res.data.passwordStatus === 2) {
          commit('TOGGLE_MODIFY_PASS', {
            status: true,
            type: 'required',
          });
        }
        commit('USER_INFO', res.data);
      }
    },
    // 获取菜单列表
    async getMenuList() {
      return basicApi.getMenuList();
    },
    // 获取侧边固定菜单列表
    async setFixedSideMenu({ commit }: { commit: Commit }, data: MenuList[]) {
      commit('SET_FIXMENULIST', data);
    },
    // 获取常用菜单列表对象
    async setStarMenu(
      { commit }: { commit: Commit },
      data: { [x: number]: MenuList[] }
    ) {
      commit('SET_STARMENU', data);
    },
    // 获取多语言列表
    async getLanguageList({ commit }: { commit: Commit }) {
      await basicApi
        .getSystemParamValueList({
          queryParam: {
            systemParamCode: 'SYSTEM_LANGUAGE',
            availableStatus: true,
          },
        })
        .then((res) => {
          if (res.status) {
            commit('LANGUAGE_LIST', res.data);
          }
        });
    },
    // 收集权限
    collectPermissions(
      { commit }: { commit: Commit },
      data: Map<string, string[]>
    ) {
      commit('COLLECT_PERMISSION', data);
    },
    /** ************************************************ 多页签控制 ************************************************* */
    // 收集子应用路由集合
    collectRouteArr(
      { commit }: { commit: Commit },
      data: Map<string, TagView[]>
    ) {
      commit('COLLECT_ROUTEARR', data);
    },
    // 添加缓存标签
    addVisitedView({ commit }: { commit: Commit }, view: TagView) {
      commit('ADD_VISITED_VIEW', view);
    },
    // 添加缓存标签和缓存页面
    addView({ commit }: { commit: Commit }, view: TagView) {
      commit('ADD_VISITED_VIEW', view);
      commit('ADD_CACHED_VIEW', view);
    },
    // 删除缓存标签和缓存页面
    delView({ commit }: { commit: Commit }, view: TagView) {
      commit('DEL_VISITED_VIEW', view);
      commit('DEL_CACHED_VIEW', view);
    },
    // 删除缓存标签
    delVisitedView({ commit }: { commit: Commit }, view: TagView) {
      commit('DEL_VISITED_VIEW', view);
    },
    // 删除缓存页面
    delCachedView({ commit }: { commit: Commit }, view: TagView) {
      commit('DEL_CACHED_VIEW', view);
    },
    // 删除其他缓存标签和缓存页面
    delOthersViews({ commit }: { commit: Commit }, view: TagView) {
      commit('DEL_OTHERS_VISITED_VIEWS', view);
      commit('DEL_OTHERS_CACHED_VIEWS', view);
    },
    // 删除所有缓存标签
    delAllVisitedViews({ commit }: { commit: Commit }) {
      commit('DEL_ALL_VISITED_VIEWS');
    },
    // 删除所有缓存页面
    delAllCachedViews({ commit }: { commit: Commit }) {
      commit('DEL_ALL_CACHED_VIEWS');
    },
    // 删除所有缓存标签和缓存页面
    delAllViews({ commit }: { commit: Commit }) {
      commit('DEL_ALL_VISITED_VIEWS');
      commit('DEL_ALL_CACHED_VIEWS');
    },
    // 更新当前激活的缓存标签
    updateVisitedView({ commit }: { commit: Commit }, view: TagView) {
      commit('UPDATE_VISITED_VIEW', view);
    },
    // 替换某个指定的缓存标签
    replaceVisitedView(
      { commit }: { commit: Commit },
      data: { oldView: TagView; newView: TagView }
    ) {
      commit('REPLACE_VISITED_VIEW', data);
    },
    // 记录访问的标签顺序
    recordViditedView({ commit }: { commit: Commit }, data: TagView[]) {
      commit('RECORD_VISITED_VIEW', data);
    },
    // 替换某个指定的缓存标签
    setShareFlag({ commit }: { commit: Commit }, data: boolean) {
      commit('SET_SHARE_FLAG', data);
    },

    getMemberSystemOptions(
      { commit }: { commit: Commit },
      data: MemberSystemOptionType[]
    ) {
      commit('GET_MEMBERSYSTEM_OPTIONS', data);
    },

    setCurMemberSystem(
      { commit }: { commit: Commit },
      data: MemberSystemOptionType
    ) {
      commit('SET_CURRENT_MEMBERSYSTEM', data);
    },

    // 设置目录列表
    async setDirectoryList({
      commit,
      state,
    }: {
      commit: Commit;
      state: BasicState;
    }) {
      await basicApi
        .getDirectoryList({
          queryParam: {
            contentFlag: false,
          },
          pageSize: 1,
          pageNum: 100,
        })
        .then((res) => {
          if (res.status) {
            const directoryList = res.data?.list ?? [];
            let activeDirectory = state.activeDirectory;
            if (!activeDirectory.id) {
              activeDirectory = directoryList?.[0] ?? {};
            }

            commit('SET_DIRECTORY_LIST', directoryList);
            commit('SET_ACTIVE_DIRECTORY', activeDirectory);
          }
        });
    },
    // 设置当前目录
    setActiveDirectory({ commit }: { commit: Commit }, data: DirectoryList) {
      commit('SET_ACTIVE_DIRECTORY', data);
    },
  },
  mutations: {
    // 激活异常弹窗
    ACTIVE_ERROR_PAGE(state: BasicState, res: PopupType) {
      state.errorPage = res;
    },
    // 修改密码弹窗
    TOGGLE_INIT_LOGIN(state: BasicState, data: boolean) {
      state.initLogin = data;
    },
    // 修改密码弹窗
    TOGGLE_MODIFY_PASS(state: BasicState, data: PopupType) {
      state.modifyPass = data;
    },
    // 设置任务中心状态
    SET_TASK_DOT_STATUS(state: BasicState, data: boolean) {
      state.taskDotStatus = data;
    },
    // 设置消息中心数量
    SET_MESSAGE_DOT_VALUE(state: BasicState, data: number) {
      state.messageDotValue = data;
    },
    // 切换当前语言
    TOGGLE_LANGUAGE(state: BasicState, data: string) {
      state.language = data;
    },
    // 切换菜单展开收起
    TOGGLE_MENU_COLLAPSE(state: BasicState, data: boolean) {
      state.menuCollapse = data;
    },
    // 切换消息展开收起
    TOGGLE_MESSAGE_COLLAPSE(state: BasicState, data: boolean) {
      state.messageCollapse = data;
    },
    // 获取用户信息
    USER_INFO(state: BasicState, userInfo: UserInfoType) {
      state.userInfo = userInfo;
    },
    // 菜单列表
    MENU_LIST(state: BasicState, res: MenuList[]) {
      state.menuList = res;
    },
    // 菜单列表
    SET_FIXMENULIST(state: BasicState, res: MenuList[]) {
      state.fixedSideMenu = res;
    },
    // 设置常用菜单列表对象
    SET_STARMENU(state: BasicState, res: { [x: number]: MenuList[] }) {
      state.starMenu = res;
    },
    // 获取多语言列表
    LANGUAGE_LIST(state: BasicState, data: LanguageList[]) {
      state.languageList = data;
      state.defaultLanguage =
        data.find((item) => item.defaultValue)?.systemParamValue ?? '';
    },
    // 收集权限
    COLLECT_PERMISSION(state: BasicState, data: Map<string, string[]>) {
      state.permissionsMap = data;
    },
    /** ************************************************ 多页签控制 ************************************************* */
    // 收集子应用路由集合
    COLLECT_ROUTEARR(state: BasicState, data: [string, TagView[]][]) {
      state.routeArrList = data;
    },
    // 添加缓存标签
    ADD_VISITED_VIEW(state: BasicState, view: TagView) {
      // 判断标签是否已存在
      if (state.visitedViews.some((item) => item.fullPath === view.fullPath)) {
        return;
      }

      const title = (view.meta?.title as string) || 'no-name';
      state.visitedViews.push({ ...view, title });
    },
    // 添加缓存页面
    ADD_CACHED_VIEW(state: BasicState, view: TagView) {
      // 已存在页面return
      const name = (view.meta?.cacheName as string) || (view.name as string);
      if (name === null || state.cachedViews.includes(name)) return;
      // 该页面是否静止缓存
      if (view.meta?.noCache) {
        if (name === null || state.noCachedViews.includes(name)) return;
        state.noCachedViews.push(name);
      } else {
        if (name === null || state.cachedViews.includes(name)) return;
        state.cachedViews.push(name);
      }
    },
    // 删除缓存标签
    DEL_VISITED_VIEW(state: BasicState, view: TagView) {
      for (let i = state.visitedViews.length - 1; i >= 0; i--) {
        if (state.visitedViews[i].fullPath === view.fullPath) {
          state.visitedViews.splice(i, 1);
          break;
        }
      }
    },
    // 删除缓存页面
    DEL_CACHED_VIEW(state: BasicState, view: TagView) {
      const name = (view.meta?.cacheName as string) || (view.name as string);
      if (name === null) return;
      const index = state.cachedViews.indexOf(name);
      if (index > -1) state.cachedViews.splice(index, 1);
    },
    // 删除其他缓存标签
    DEL_OTHERS_VISITED_VIEWS(state: BasicState, view: TagView) {
      // 过滤不能关闭的页面和自身
      state.visitedViews = state.visitedViews.filter((item) => {
        return item.meta?.affix || item.fullPath === view.fullPath;
      });
    },
    // 删除其他缓存页面
    DEL_OTHERS_CACHED_VIEWS(state: BasicState, view: TagView) {
      const name = (view.meta?.cacheName as string) || (view.name as string);
      if (name === null) return;
      const index = state.cachedViews.indexOf(name);
      if (index > -1) {
        state.cachedViews = state.cachedViews.slice(index, index + 1);
      } else {
        // if index = -1, there is no cached tags
        state.cachedViews = [];
      }
    },
    // 删除所有缓存标签
    DEL_ALL_VISITED_VIEWS(state: BasicState) {
      // 过滤不能关闭的标签
      const affixTags = state.visitedViews.filter((tag) => tag.meta?.affix);
      state.visitedViews = affixTags;
    },
    // 删除所有缓存页面
    DEL_ALL_CACHED_VIEWS(state: BasicState) {
      state.cachedViews = [];
    },
    // 更新当前激活的缓存标签
    UPDATE_VISITED_VIEW(state: BasicState, view: TagView) {
      for (let v of state.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view);
          break;
        }
      }
    },
    // 替换某个缓存标签
    REPLACE_VISITED_VIEW(
      state: BasicState,
      data: { oldView: TagView; newView: TagView }
    ) {
      const { newView, oldView } = data;
      for (let i = state.visitedViews.length - 1; i >= 0; i--) {
        if (state.visitedViews[i].fullPath === oldView.fullPath) {
          state.visitedViews[i] = Object.assign(state.visitedViews[i], newView);
          break;
        }
      }
    },
    // 记录访问的标签顺序
    RECORD_VISITED_VIEW(state: BasicState, data: TagView[]) {
      state.visitedViewsOrder = data;
    },
    // 检测是否是分享页面
    SET_SHARE_FLAG(state: BasicState, isSharePage: boolean) {
      state.isSharePage = isSharePage;
    },

    // 获取会员体系下拉列表
    GET_MEMBERSYSTEM_OPTIONS(
      state: BasicState,
      data: MemberSystemOptionType[]
    ) {
      state.memberSystemOptions = data;
    },

    // 设置当前会员体系
    SET_CURRENT_MEMBERSYSTEM(state: BasicState, data: MemberSystemOptionType) {
      state.curMemberSystem = data;
    },

    // 设置目录列表
    SET_DIRECTORY_LIST(state: BasicState, data: DirectoryList[]) {
      state.directoryList = data;
    },
    // 设置当前目录
    SET_ACTIVE_DIRECTORY(state: BasicState, data: DirectoryList) {
      state.activeDirectory = data;
    },
  },
  state: () => ({
    errorPage: {},
    initLogin: false, // 首次登陆
    modifyPass: {},
    language: 'zh-CN',
    menuCollapse: false,
    messageCollapse: false,
    taskDotStatus: false,
    messageDotValue: 0,
    userInfo: {},
    menuList: [],
    defaultLanguage: '',
    languageList: [],
    routeArrList: [],
    permissionsMap: new Map(),
    visitedViews: [], // 标签集合
    noCachedViews: [], // 禁止缓存的页面
    cachedViews: [], // 缓存的页面
    visitedViewsOrder: [], // 访问的标签顺序
    isSharePage: false, // 是否是对外分享页面
    shareRouterWhiteList: ['/insight/share/dashboard'], // 分享页面路由
    onlyShowMainRouters: [
      '/insight/analysispanel/dashboard',
      '/insight/chartComp/ChartCompDetail',
    ], // 只展示main区域的路由
    memberSystemOptions: [], // 会员体系选项
    curMemberSystem: { id: 0, name: '' }, // 当前会员体系
    directoryList: [], // 目录列表
    activeDirectory: {}, // 当前目录
    fixedSideMenu: [], // 固定左侧菜单
    starMenu: {}, // 常用菜单对象
  }),
};

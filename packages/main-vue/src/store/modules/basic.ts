import { Commit } from 'vuex';
import { BasicState, PopupType } from '../types';

export default {
  namespaced: true,
  actions: {
    // 激活异常弹窗
    activeErrorPage({ commit }: { commit: Commit }, data: PopupType) {
      commit('ACTIVE_ERROR_PAGE', data);
    },
  },
  mutations: {
    // 激活异常弹窗
    ACTIVE_ERROR_PAGE(state: BasicState, res: PopupType) {
      state.errorPage = res;
    },
  },
  state: () => ({
    errorPage: {},
  }),
};

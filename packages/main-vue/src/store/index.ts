import { createStore, Store } from 'vuex';
import vuexPersistedstate from 'vuex-persistedstate';
import basic from './modules/basic';
import { BasicState, TagView } from './types';

export type State = {
  basic: BasicState;
};

const store: Store<State> = createStore({
  modules: {
    basic,
  },
  plugins: [
    vuexPersistedstate({
      setState(key: string, state: State, storage: Storage) {
        // Map转为数组
        state.basic.routeArrList = Array.from(state.basic.routeArrList);

        return storage.setItem(key, JSON.stringify(state));
      },
      reducer(val: State) {
        const {
          language,
          languageList,
          menuCollapse,
          messageCollapse,
          taskDotStatus,
          messageDotValue,
          cachedViews,
          noCachedViews,
          routeArrList,
          visitedViews,
          memberSystemOptions,
          curMemberSystem,
          directoryList,
          activeDirectory,
        } = val.basic;

        // 处理route循环引用
        visitedViews.map((vitem: TagView) => {
          const newMatched = vitem.matched?.map((witem) => {
            return {
              name: witem.name,
              meta: witem.meta,
            };
          });

          return {
            ...vitem,
            matched: newMatched,
          };
        });

        return {
          basic: {
            language,
            languageList,
            menuCollapse,
            messageCollapse,
            taskDotStatus,
            messageDotValue,
            cachedViews,
            noCachedViews,
            routeArrList,
            visitedViews,
            memberSystemOptions,
            curMemberSystem,
            directoryList,
            activeDirectory,
          },
        };
      },
    }),
  ],
});

export default store;

import { initGlobalState } from 'qiankun';

// 初始化state
const initialState = {
  title: '',
};

// 初始化
const actions = initGlobalState(initialState);
// 监听
actions.onGlobalStateChange((state, prev) => {
  if (prev.title !== state.title) {
    document.title = state.title;
  }
});

export default actions;

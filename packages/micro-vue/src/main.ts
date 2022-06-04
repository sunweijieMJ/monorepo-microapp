import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteLocation } from 'vue-router';
import App from './App.vue';
import routes from './router';

declare global {
  interface Window {
    __POWERED_BY_QIANKUN__: boolean;
    __INJECTED_PUBLIC_PATH_BY_QIANKUN__: string;
  }
}

let router: any = null;
let instance: any = null;
// eslint-disable-next-line no-underscore-dangle
const POWERED_BY_QIANKUN = window.__POWERED_BY_QIANKUN__;

// render
function render() {
  router = createRouter({
    history: createWebHistory('micro-vue'),
    routes,
  });

  instance = createApp(App).use(router).mount('#vue-root');
}

export async function bootstrap() {
  console.log('bootstrap');
}

export async function mount(props?: any) {
  render();
  if (props.setGlobalState && router) {
    // 通知父应用路由改变
    router.afterEach((to: RouteLocation) => {
      props.setGlobalState({ title: to.meta.title });
    });
  }
}

export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  router = null;
}

// 单独开发环境
if (!POWERED_BY_QIANKUN) mount();

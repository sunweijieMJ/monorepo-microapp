import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import type { Router } from 'vue-router';
import App from './App.vue';
import routes from './router';

let router: Router | null = null;
let instance: any = null;
// eslint-disable-next-line no-underscore-dangle
const POWERED_BY_QIANKUN = window.__POWERED_BY_QIANKUN__;

// render
function render(container?: ShadowRoot) {
  router = createRouter({
    history: createWebHistory('/'),
    routes,
  });

  let root = document.querySelector('#micro-vue-root') as HTMLElement;
  if (container) {
    root = container.querySelector('#micro-vue-root') as HTMLElement;
  }

  instance = createApp(App).use(router).mount(root);
}

export async function bootstrap() {
  console.log('vue bootstrap');
}

export async function mount(props?: any) {
  const { container } = props;
  console.log('vue mount');
  render(container);
}

export async function update(props?: any) {
  const { container } = props;
  console.log('vue update');
  render(container);
}

export async function unmount() {
  console.log('vue unmount');
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  router = null;
}

// 单独开发环境
if (!POWERED_BY_QIANKUN) mount();

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import routes from './router';

let router: any = null;
let instance: any = null;
// eslint-disable-next-line no-underscore-dangle
const POWERED_BY_QIANKUN = window.__POWERED_BY_QIANKUN__;

// render
function render() {
  router = createRouter({
    history: createWebHistory('/'),
    routes,
  });

  instance = createApp(App).use(router).mount('#micro-vue-root');
}

export async function bootstrap() {
  console.log('vue bootstrap');
}

export async function mount() {
  console.log('vue mount');
  render();
}

export async function update() {
  console.log('vue update');
  render();
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

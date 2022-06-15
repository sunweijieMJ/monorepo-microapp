<template>
  <div class="layout">
    <LayoutHeader class="layout-header"></LayoutHeader>
    <LayoutAside class="layout-aside"></LayoutAside>
    <LayoutNav class="layout-nav"></LayoutNav>
    <!-- 子应用容器 -->
    <section id="micro-vue" class="micro-app"></section>
    <section id="micro-react" class="micro-app"></section>
  </div>
</template>
<script lang="ts">
// 导入乾坤函数
import {
  loadMicroApp, // 手动加载一个微应用
  registerMicroApps, // 注册子应用方法
  setDefaultMountApp, // 设默认启用的子应用
  prefetchApps, // 预加载子应用
  start, // 启动qiankun
  runAfterFirstMounted, // 第一个微应用 mount
  addGlobalUncaughtErrorHandler, // 添加全局未捕获异常处理器
} from 'qiankun';
import type { MicroApp } from 'qiankun';
import { defineComponent, onMounted, ref } from 'vue';

import microApps from '@/config/microApps';
import menuList from '@/config/menuList';
import type { MenuList } from '@/config/menuList';

import LayoutHeader from './LayoutHeader.vue';
import LayoutAside from './LayoutAside.vue';
import LayoutNav from './LayoutNav.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    LayoutHeader,
    LayoutAside,
    LayoutNav,
  },
  setup() {
    // loadMicroApp的实例对象
    const activeApp = ref<MicroApp | null>(null);

    onMounted(() => {
      // autoLoadMicroApps(menuList);
      manualLoadMicroApps(window.location.pathname.split('/')[1]);
    });

    // 手动加载子应用
    const manualLoadMicroApps = (name: string) => {
      const microApp = microApps.find((item) => item.name === name);

      if (microApp) {
        // 切换微应用时，先卸载前一个微应用
        if (activeApp?.value?.getStatus() === 'MOUNTED') {
          // 卸载前一个应用
          activeApp.value.unmount();
          // 卸载完前一个应用后紧接着加载新的应用，这里用qiankun的loadMicroApp来加载微应用，返回一个实例，可以通过实例上的unmount方法卸载自身。
          activeApp.value = loadMicroApp(microApp);

          return;
        }

        // 如果微应用是初次加载，那么不用先卸载之前挂载的应用直接加载
        activeApp.value = loadMicroApp(microApp);
      }
    };

    // 自动加载子应用
    const autoLoadMicroApps = (menuList: MenuList[]) => {
      let defaultPath = menuList[0].routePath;

      // 预加载子应用
      prefetchApps(microApps);

      // 注册子应用
      registerMicroApps(microApps);

      // 设置默认子应用
      const activePath = window.location.pathname.split('/')[1];
      if (activePath) {
        defaultPath = `/${activePath}`;
      }
      setDefaultMountApp(defaultPath);

      // 启动微服务
      start({
        prefetch: true,
      });

      // 第一个微应用 mount 后需要调用的方法
      runAfterFirstMounted(() => console.log('runAfterFirstMounted'));

      // 设置全局未捕获异常处理器
      addGlobalUncaughtErrorHandler((event) => console.log(event));
    };
  },
});
</script>
<style lang="scss" global>
.layout {
  display: grid;
  grid-template:
    'aside header header' 50px
    'aside nav main'
    'aside nav main' 1fr / 60px min-content 1fr;
  min-width: 1260px;
  height: 100vh;

  .layout-header {
    grid-area: header;
    background-color: rgb(155, 104, 212);
  }

  .layout-aside {
    grid-area: aside;
    background-color: rgb(143, 206, 206);
  }

  .layout-nav {
    grid-area: nav;
    min-width: 200px;
    background-color: rgb(216, 120, 120);
  }

  .micro-app {
    // grid-area: main;
    overflow-y: auto;
    transition: width 0.3s;
    background-color: #f6f7fb;
    scroll-behavior: smooth;
    will-change: width;
  }
}
</style>

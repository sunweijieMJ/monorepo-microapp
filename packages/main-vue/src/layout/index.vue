<template>
  <div class="layout">
    <LayoutHeader class="layout-header"></LayoutHeader>
    <LayoutAside class="layout-aside"></LayoutAside>
    <LayoutNav class="layout-nav"></LayoutNav>
    <!-- 子应用容器 -->
    <section id="micro-app"></section>
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
import { defineComponent, onMounted } from 'vue';

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
    onMounted(() => {
      autoLoadMicroApps(menuList);
      // manualLoadMicroApps();
    });

    // 手动加载子应用
    const manualLoadMicroApps = () => {
      microApps.forEach((item) => {
        loadMicroApp({
          name: item.name,
          entry: item.entry,
          container: item.container,
        });
      });
    };

    // 自动加载子应用
    const autoLoadMicroApps = (menuList: MenuList[]) => {
      let defaultApp = menuList[0].routePath;

      // 预加载子应用
      prefetchApps(microApps);

      // 注册子应用
      registerMicroApps(microApps);

      // 设置默认子应用
      const activeApp = window.location.pathname.split('/')[1];
      if (activeApp) {
        defaultApp = `/${activeApp}`;
      }
      setDefaultMountApp(defaultApp);

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
    grid-area: main;
    overflow-y: auto;
    transition: width 0.3s;
    background-color: #f6f7fb;
    scroll-behavior: smooth;
    will-change: width;
  }
}
</style>

<div class="layout">
  <LayoutHeader class="layout-header"></LayoutHeader>
  <LayoutAside class="layout-aside"></LayoutAside>
  <LayoutNav class="layout-nav"></LayoutNav>
  <!-- 子应用容器 -->
  <section id="micro-app"></section>
</div>
<script lang="ts">
  // 导入乾坤函数
  import {
    registerMicroApps, // 注册子应用方法
    setDefaultMountApp, // 设默认启用的子应用
    prefetchApps, // 预加载子应用
    start, // 启动qiankun
    runAfterFirstMounted, // 第一个微应用 mount
    addGlobalUncaughtErrorHandler, // 添加全局未捕获异常处理器
  } from 'qiankun';
  import { onMount } from 'svelte';
  import LayoutHeader from './LayoutHeader.svelte';
  import LayoutAside from './LayoutAside.svelte';
  import LayoutNav from './LayoutNav.svelte';
  import { basicApi } from '@/api';

  import microApps from '@/config/microApps';
  import menuList from '@/config/menuList';
  import type { MenuList } from '@/config/menuList';

  onMount(() => {
    basicApi.getGraphicCode().then((res) => {
      console.log(res);
    });
    startMicroApp(menuList);
  });

  const startMicroApp = (menuList: MenuList[]) => {
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
    runAfterFirstMounted(() => {
      console.log('runAfterFirstMounted');
    });
    // 设置全局未捕获异常处理器
    addGlobalUncaughtErrorHandler((event) => console.log(event));
  };
</script>
<style lang="scss" global>
  .layout {
    display: grid;
    grid-template:
      'aside header header' 50px
      'aside nav main'
      'aside nav main' 1fr / 60px min-content 1fr;
    height: 100vh;
    min-width: 1260px;

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
      background-color: #f6f7fb;
      grid-area: main;
      overflow-y: auto;
      scroll-behavior: smooth;
      transition: width 0.3s;
      will-change: width;
    }
  }
</style>

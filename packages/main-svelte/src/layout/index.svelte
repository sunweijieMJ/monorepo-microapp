<div class="layout">
  <header class="layout-header">header</header>
  <aside class="layout-aside">aside</aside>
  <nav class="layout-nav">nav</nav>
  <div id="micro-app"></div>
</div>
<script lang="ts">
  import { onMount } from 'svelte';
  // 导入乾坤函数
  import {
    registerMicroApps, // 注册子应用方法
    setDefaultMountApp, // 设默认启用的子应用
    prefetchApps, // 预加载子应用
    start, // 启动qiankun
    runAfterFirstMounted, // 第一个微应用 mount
    addGlobalUncaughtErrorHandler, // 添加全局未捕获异常处理器
  } from 'qiankun';

  interface MicroApp {
    name: 'common' | 'rights';
    activeRule: string | string[];
    container: string;
    entry: string;
    props?: any;
  }
  interface MenuList {
    name: string;
    title: string;
    routeName: string;
    routePath: string;
    children: MenuList[];
  }

  const microApps: MicroApp[] = [
    {
      name: 'micro-vue',
      activeRule: ['/micro-vue'],
      container: '#micro-app',
      entry: 'http://localhost:3001/',
    },
    {
      name: 'micro-react',
      activeRule: ['/micro-react'],
      container: '#micro-app',
      entry: 'http://localhost:3002/',
    },
  ];
  const menuList = [
    {
      name: 'micro-vue',
      title: 'vue',
      routeName: 'micro-vue',
      routePath: '/micro-vue',
      children: [],
    },
    {
      name: 'micro-react',
      title: 'react',
      routeName: 'micro-react',
      routePath: '/micro-react',
      children: [],
    },
  ];

  onMount(() => {
    startMicroApp(menuList);
  });

  const startMicroApp = (menu: MenuList[]) => {
    const menuListInfo = menu;
    let defaultApp = '';

    // 预加载子应用
    prefetchApps(microApps);
    // 注册子应用
    registerMicroApps(microApps);
    // 设置默认子应用
    if (window.location.pathname.split('/')[1]) {
      defaultApp = `/${window.location.pathname.split('/')[1]}`;
    }
    if (!defaultApp) defaultApp = menuListInfo[1].routePath;
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
<style lang="scss">
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

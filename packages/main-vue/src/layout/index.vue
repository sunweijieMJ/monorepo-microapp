<template>
  <div class="layout">
    <LayoutHeader class="layout-header"></LayoutHeader>
    <LayoutAside class="layout-aside"></LayoutAside>
    <LayoutNav class="layout-nav"></LayoutNav>
    <!-- 子应用容器 -->
    <div
      v-for="(item, index) in microAppList"
      :id="item.name"
      :key="index"
      :class="['micro-app', { 'active-app': activeName === item.name }]"
    ></div>
  </div>
</template>
<script lang="ts">
import { loadMicroApp } from 'qiankun';
import type { MicroApp } from 'qiankun';
import { defineComponent, onMounted, ref } from 'vue';
import microApps from '../config/microApps';
import LayoutAside from './LayoutAside.vue';
import LayoutHeader from './LayoutHeader.vue';
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
    const activeName = ref(window.location.pathname.split('/')[1]);
    const microAppList = microApps;

    onMounted(() => {
      manualLoadMicroApps(window.location.pathname.split('/')[1]);
    });

    // 手动加载子应用
    const manualLoadMicroApps = (name: string) => {
      const microApp = microAppList.find((item) => item.name === name);

      if (microApp) {
        activeName.value = name;
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

    return {
      activeName,
      microAppList,
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

    &:not(.active-app) {
      z-index: -1;
    }
  }
}
</style>

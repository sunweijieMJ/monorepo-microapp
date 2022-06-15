<template>
  <nav class="layout-nav">
    <el-menu :default-active="activeIndex" @select="handleSelect">
      <el-menu-item index="/micro-vue/HomePage1">
        <span>vue HomePage1</span>
      </el-menu-item>
      <el-menu-item index="/micro-vue/HomePage2">
        <span>vue HomePage2</span>
      </el-menu-item>
      <el-menu-item index="/micro-react/HomePage1">
        <span>react HomePage1</span>
      </el-menu-item>
      <el-menu-item index="/micro-react/HomePage2">
        <span>react HomePage2</span>
      </el-menu-item>
    </el-menu>
  </nav>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    let activeIndex = window.location.pathname;
    const handleSelect = (path: string) => {
      activeIndex = path;

      window.location.href = path;
    };

    return {
      activeIndex,
      handleSelect,
    };
  },
});
</script>

<template>
  <nav class="layout-nav">
    <el-link @click="skip('/micro-vue')">vue</el-link>
    <el-link @click="skip('/micro-react')">react</el-link>
  </nav>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    const skip = (path: string) => {
      window.location.href = path;
    };

    return {
      skip,
    };
  },
});
</script>

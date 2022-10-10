<template>
  <div class="root">
    <el-config-provider :locale="locale">
      <router-view />
      <!-- 弹窗组件 -->
    </el-config-provider>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'App',
  setup() {
    const $i18n = useI18n();
    const messages = $i18n.messages.value as Record<string, any>;
    const locale = messages[$i18n.locale.value];

    return {
      locale,
    };
  },
});
</script>
<style lang="scss">
// 重置样式
@import './assets/scss/reset';

html,
body,
#main-vue {
  min-width: 1260px;
  min-height: 100vh;
  background-color: #fff;
}
</style>

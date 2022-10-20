const { defineConfig } = require('@vue/cli-service');
const AutoImport = require('unplugin-auto-import/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
const Components = require('unplugin-vue-components/webpack');

const port = 3000;

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port,
  },
  configureWebpack: {
    resolve: {
      alias: {
        'vue-i18n': 'vue-i18n/dist/vue-i18n.esm-browser.prod',
      },
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require('@vue/cli-service');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const AutoImport = require('unplugin-auto-import/webpack');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Components = require('unplugin-vue-components/webpack');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

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

const { defineConfig } = require('@vue/cli-service');
const { name } = require('./package.json');

const port = 3001;

module.exports = defineConfig({
  // 部署应用时的基本URL
  transpileDependencies: true,
  configureWebpack: (config) => {
    // 微前端打包配置
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = 'umd';
  },
  devServer: {
    host: 'localhost',
    port,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});

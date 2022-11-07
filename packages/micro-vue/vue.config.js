const { defineConfig } = require('@vue/cli-service');
const { name } = require('./package.json');

const port = 3001;
const isDev = process.env.NODE_ENV === 'development';

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    if (!isDev) {
      // 微前端打包配置
      config.output.library = `${name}-[name]`;
      config.output.libraryTarget = 'umd';
    }
  },
  devServer: {
    host: 'localhost',
    port,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
});

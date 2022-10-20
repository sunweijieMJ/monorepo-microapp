const { defineConfig } = require('@vue/cli-service');
const { name } = require('./package.json');

const port = 3001;

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
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

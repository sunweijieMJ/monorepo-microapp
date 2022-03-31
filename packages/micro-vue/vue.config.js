// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require('@vue/cli-service');
// eslint-disable-next-line @typescript-eslint/no-var-requires
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

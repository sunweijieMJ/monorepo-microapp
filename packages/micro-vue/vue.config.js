// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name } = require('./package.json');

const port = 3001;

module.exports = {
  configureWebpack: (config) => {
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = 'umd';
    config.output.jsonpFunction = `webpackJsonp_${name}`;
  },
  devServer: {
    host: 'localhost',
    port,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};

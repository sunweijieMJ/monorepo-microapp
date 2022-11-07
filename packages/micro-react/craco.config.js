const { name } = require('./package.json');

const port = 3002;
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      if (!isDev) {
        webpackConfig.output = {
          ...webpackConfig.output,
          // 微前端打包配置
          library: `${name}-[name]`,
          libraryTarget: `umd`,
        };
      }

      return webpackConfig;
    },
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};

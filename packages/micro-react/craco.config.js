const { name } = require('./package.json');

const port = 3002;

module.exports = {
  // 配置开发环境代理
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  // 自定义webpack配置
  webpack: {
    configure: (webpackConfig, { env }) => {
      if (env === 'production') {
        webpackConfig.output = {
          ...webpackConfig.output,
          publicPath: `//localhost:${port}`,
          // 微前端打包配置
          library: `${name}-[name]`,
          libraryTarget: `umd`,
        };
      }

      return webpackConfig;
    },
  },
};

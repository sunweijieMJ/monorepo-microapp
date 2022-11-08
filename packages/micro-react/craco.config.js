const { name } = require('./package.json');

// const port = 3002;

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.output = {
        ...webpackConfig.output,
        // 微前端打包配置
        library: `${name}-[name]`,
        libraryTarget: `umd`,
      };

      return webpackConfig;
    },
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};

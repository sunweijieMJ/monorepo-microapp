const path = require('path');
const { addAfterLoaders, loaderByName } = require('@craco/craco');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const timeStamp = Date.now();
const resolve = (dir) => path.join(__dirname, '.', dir);

module.exports = {
  // 配置开发环境代理
  devServer: {
    https: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  webpack: {
    // 自定义webpack配置
    configure: (webpackConfig, { env, paths }) => {
      if (env === 'production') {
        // 关闭devtool
        webpackConfig.devtool = false;

        // 修改打包目录名称
        paths.appBuild = 'dist';

        // 修改output
        webpackConfig.output = {
          ...webpackConfig.output,
          // 打包目录
          path: resolve('./dist'),
          // 打包编译文件名称[hash.时间戳]
          filename: `static/js/[name].${timeStamp}.js`,
          chunkFilename: `static/js/[name].${timeStamp}.js`,
        };

        webpackConfig.plugins.push(
          // 打包语言包
          new CopyWebpackPlugin({
            patterns: [{ from: './src/locale', to: './locale' }],
          })
        );

        if (process.env.ANALYZER) {
          webpackConfig.plugins.push(
            // 打包产物分析
            new BundleAnalyzerPlugin()
          );
        }
      }

      // 配置扩展扩展名
      webpackConfig.resolve.extensions = [
        ...webpackConfig.resolve.extensions,
        ...['.scss', '.less'],
      ];

      // 配置全局scss
      addAfterLoaders(webpackConfig, loaderByName('sass-loader'), {
        loader: require.resolve('sass-resources-loader'),
        options: {
          resources: ['./src/assets/scss/base.scss'],
        },
      });

      return webpackConfig;
    },
  },
};

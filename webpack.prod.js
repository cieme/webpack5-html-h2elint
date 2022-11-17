const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');

module.exports = () => {
  return merge(common, {
    mode: 'production',
    output: {
      clean: true,
      publicPath: './',
    },
    performance: {
      // 性能设置,文件打包过大时，会报警告
      hints: 'warning',
    },
    module: {
      rules: [
        {
          test: /\.((c|sa|sc)ss)$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: false,
                publicPath: '../',
              },
            },
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        },
      ],
    },
    plugins: [
      new BundleAnalyzerPlugin(),
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    ],
  });
};

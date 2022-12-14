const path = require('path');

const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');

module.exports = () => {
  return merge(common, {
    mode: 'development',
    output: {
      publicPath: '/',
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      client: {
        overlay: true,
      },
      compress: true,
      // static: ['src/assets'],
      port: 9000,
      hot: true,
      historyApiFallback: true,
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.((c|sa|sc)ss)$/i,
          use: [
            {
              loader: 'style-loader',
            },
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        },
      ],
    },
    plugins: [new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('development') })],
  });
};

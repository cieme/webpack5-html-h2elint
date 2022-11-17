const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

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
      new CompressionPlugin({
        // filename: '[path][base].gz',
        filename: () => {
          return '[path][base].gz';
        }, //  使得多个.gz文件合并成一个文件，这种方式压缩后的文件少，建议使用
        algorithm: 'gzip', // 官方默认压缩算法也是gzip
        test: /\.js$|\.css$|\.html$|\.ttf$|\.eot$|\.woff$/, // 使用正则给匹配到的文件做压缩，这里是给html、css、js以及字体（.ttf和.woff和.eot）做压缩
        threshold: 10240, // 以字节为单位压缩超过此大小的文件，使用默认值10240吧
        minRatio: 0.8, // 最小压缩比率，官方默认0.8
        // 是否删除原有静态资源文件，即只保留压缩后的.gz文件，建议这个置为false，还保留源文件。以防：
        deleteOriginalAssets: false,
      }),
    ],
  });
};

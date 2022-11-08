const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './main.js',
  target: ['web', 'es5'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
    chunkFilename: '[name].js',
    assetModuleFilename: 'image/[contenthash][ext]',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  optimization: {
    runtimeChunk: 'single', //会将Webpack在浏览器端运行时需要的代码单独抽离到一个文件
    splitChunks: {
      cacheGroups: {
        commons: {
          //产生一个Chunk
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
        },
        vendor: {
          //产生一个Chunk
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(htm|html)$/i,
        use: {
          loader: 'html-loader',
          options: {
            sources: true,
            minimize: false,
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        // More information here https://webpack.js.org/guides/asset-modules/
        // type: 'asset',
        // use: [
        //   {
        //     // loader: 'url-loader',
        //     // options: {
        //     //   limit: 8192,
        //     //   esModule: false,
        //     //   publicPath: './image',
        //     // },
        //     loader: 'file-loader',
        //     options: {
        //       publicPath: 'image',
        //       outputPath: 'image',
        //     },
        //   },
        // ],
        type: 'asset/resource',
      },
      {
        test: /\.m?js$/,
        // exclude: /(node_modules|bower_components)/,
        include: [
          path.resolve(__dirname, 'node_modules/js-base64'),
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'utils'),
          path.resolve(__dirname, 'main.js'),
        ],
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css', //抽离css之后输出的文件名
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/views/index.html',
      filename: 'index.html',
      publicPath: 'auto',
      minify: false,
    }),
  ],
}

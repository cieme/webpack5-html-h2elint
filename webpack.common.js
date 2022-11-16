const path = require('path');
const { getHtmlList } = require('./html-file');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const NodePolyfillWebpackPlugin = require('node-polyfill-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const htmlList = getHtmlList();
module.exports = {
  entry: './src/main.js',
  // devtool:"source-map",
  target: ['web', 'es5'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
    chunkFilename: '[name].js',
    assetModuleFilename: 'image/[contenthash][ext]',
    // environment: {
    //   // 是否使用箭头函数
    //   arrowFunction: false,
    // },
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.wasm', '.scss', '.less', '.css'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
    fallback: {
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      stream: require.resolve('stream-browserify'),
      zlib: require.resolve('browserify-zlib'),
    },
  },
  optimization: {
    runtimeChunk: 'single', // 会将Webpack在浏览器端运行时需要的代码单独抽离到一个文件
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '.', // 分割出来的加分隔符
      name: '[name]',
      // minSize: 10000,
      // maxSize: 244000,
      cacheGroups: {
        commons: {
          // 产生一个Chunk
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
        },
        jq: {
          // 产生一个Chunk
          test: /node_modules[\\/](jquery)/,
          chunks: 'all',
          name: 'jq',
          priority: 10,
        },
        vendor: {
          // 产生一个Chunk
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          // name(module, chunks, cacheGroupKey) {
          //   const moduleFileName = module
          //     .identifier()
          //     .split('/')
          //     .reduceRight((item) => item);
          //   const allChunksNames = chunks.map((item) => item.name).join('~');
          //   return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          // },
          priority: 10,
          enforce: true,
        },

        // commons: {
        //   name: 'chunk-commons',
        //   test: path.resolve(__dirname, 'src/components'), // can customize your rules
        //   minChunks: 3, //  minimum common number
        //   priority: 5,
        //   reuseExistingChunk: true,
        // },
      },
    },
  },
  module: {
    rules: [
      // {
      //   test: /\.html$/,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: '[name][ext]',
      //   },
      // },
      // {
      //   test: /\.html$/i,
      //   use: ['html-loader'],
      // },
      // {
      //   test: /\.(htm|html|.hbs|ejs)$/i,
      //   use: [
      //     {
      //       loader: 'html-loader',
      //       options: {
      //         esModule: false,
      //         sources: true,
      //         // minimize: false,
      //       },
      //     },
      //     { loader: 'markup-inline-loader' },
      //     { loader: 'include-template-loader' },
      //   ],
      //   // type: 'asset/resource',
      // },
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
          path.resolve(__dirname, 'node_modules/axios'),
          path.resolve(__dirname, 'node_modules/stream-http'),
          path.resolve(__dirname, 'node_modules/https-browserify'),
          path.resolve(__dirname, 'node_modules/stream-browserify'),
          path.resolve(__dirname, 'node_modules/browserify-zlib'),
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
    // new NodePolyfillWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css', // 抽离css之后输出的文件名
      chunkFilename: '[id].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
    }),
    ...htmlList.map((item) => {
      return new HtmlWebpackPlugin({
        meta: {
          charset: 'UTF-8',
          'X-UA-Compatible': {
            'http-equiv': 'X-UA-Compatible',
            content: 'IE=edge',
          },
          viewport:
            'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover',
          'format-detection': 'telephone=no,email=no',
          'apple-mobile-web-app-capable': 'yes',
          'apple-mobile-web-app-status-bar-style': 'black-translucent',
          'apple-mobile-web-app-title': 'webApp',
          'apple-touch-fullscreen': 'yes',
          browsermode: 'application',
        },
        title: '首页',
        template: item.fileFullPath,
        // template: `./src/views/${item}`,
        filename: `${item.onlyName}.html`,
        publicPath: 'auto',
        minify: true,
        inject: true, // true false head body
        scriptLoading: 'defer', // blocking module
        xhtml: false,
      });
    }),
  ],
};

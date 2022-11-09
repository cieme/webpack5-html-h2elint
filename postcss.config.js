const px2rem = require('postcss-plugin-px2rem');

module.exports = {
  plugins: [
    [
      'postcss-preset-env',
      {
        // Options
      },
    ],
    [
      px2rem({
        rootValue: 100, // 默认100
        unitPrecision: 5,
        propWhiteList: [],
        propBlackList: [],
        exclude: /(node_modules)/,
        selectorBlackList: [],
        ignoreIdentifier: false,
        replace: true,
        mediaQuery: false,
        minPixelValue: 0, // 默认 0
      }),
    ],
  ],
};

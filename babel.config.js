module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        debug: false,
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
  ],
  plugins: [
    // [
    // '@babel/plugin-transform-modules-umd',
    // { strict: false, allowTopLevelThis: true, importInterop: 'babel' },
    // ],
    // ['@babel/plugin-transform-modules-commonjs'],
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
      },
    ],
  ],
};

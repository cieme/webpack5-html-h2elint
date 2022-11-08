module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        debug: true,
        useBuiltIns: 'usage',
        corejs: 3,
        // targets: {
        //   chrome: '58',
        //   ie: '10',
        // },
        targets: {
          ie: 9,
          chrome: 50,
          firefox: 50,
        },
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-modules-umd',
      { strict: false, allowTopLevelThis: true, importInterop: 'babel' },
    ],
    ['@babel/plugin-transform-modules-commonjs'],
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
      },
    ],
  ],
}

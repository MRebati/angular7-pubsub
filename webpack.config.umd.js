const path = require('path');
// Webpack and its plugins
const CompressionPlugin = require('compression-webpack-plugin');

const ENV = process.env.NODE_ENV = 'production';

const metadata = {
  env: ENV
};
module.exports = {
  devtool: 'source-map',
  entry: {
    'main': './src/index.ts'
  },
  mode: 'production',
  externals: {
    '@angular/core': {
      root: ['ng', 'core'],
      commonjs: '@angular/core',
      commonjs2: '@angular/core',
      amd: '@angular/core'
    },
    '@angular/common': {
      root: ['ng', 'common'],
      commonjs: '@angular/common',
      commonjs2: '@angular/common',
      amd: '@angular/common'
    },
    '@angular/platform-browser': {
      root: ['ng', 'platformBrowser'],
      commonjs: '@angular/platform-browser',
      commonjs2: '@angular/platform-browser',
      amd: '@angular/platform-browser'
    },
    'rxjs/Subscription': {
      root: ['rx', 'Subscription'],
      commonjs: 'rxjs/Subscription',
      commonjs2: 'rxjs/Subscription',
      amd: 'rxjs/Subscription'
    }
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader', query: { compilerOptions: { noEmit: false } } }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist/umd'),
    filename: 'ngx-pubsub.js',
    libraryTarget: 'umd',
    library: 'ngx-pubsub'
  },
  plugins: [
    new CompressionPlugin({test: /\.css$|\.html$|\.js$|\.map$/ })
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(__dirname, 'node_modules')]
  }
};
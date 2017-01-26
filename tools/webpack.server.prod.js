/* eslint no-param-reassign: 0 */

const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const serverConfig = require('../server/config');

const CONFIG = require('./webpack.base');
const { SERVER_ENTRY, SERVER_OUTPUT, CSS_OUTPUT } = CONFIG;

function getExternals() {
  const nodeModules = fs.readdirSync(path.join(process.cwd(), 'node_modules'));
  return nodeModules.reduce((ext, mod) => {
    ext[mod] = `commonjs ${mod}`;
    return ext;
  }, {});
}

module.exports = {
  target: 'node',
  devtool: 'inline-source-map',
  entry: SERVER_ENTRY,
  output: {
    path: SERVER_OUTPUT,
    filename: 'server.js',
  },
  externals: getExternals(),
  node: {
    __filename: true,
    __dirname: true,
  },
  module: {
    loaders: [
      {
        test: /css-modules-require-hook/,
        loader: 'null',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0', 'react-optimize'],
        },
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', `css?modules&importLoaders=1&localIdentName=${serverConfig.cssModuleScope}&minimize`),
        exclude: /node_modules/,
      },

    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/\.(less|scss|svg|png|jpe?g|png)$/),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin(CSS_OUTPUT, { allChunks: true }),
  ],
};

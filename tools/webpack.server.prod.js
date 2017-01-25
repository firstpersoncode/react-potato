/* eslint no-param-reassign: 0 */

const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

const CONFIG = require('./webpack.base');
const { SERVER_ENTRY, SERVER_OUTPUT } = CONFIG;

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


    ],
  },
  plugins: [
    new webpack.BannerPlugin(
        'require("source-map-support").install();',
        { raw: true, entryOnly: false }
    ),
    new webpack.IgnorePlugin(/\.(css|less|scss|svg|png|jpe?g|png)$/),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
};

/**
 * Created by sumith on 2/1/17.
 */

'use strict';

const webpack = require('webpack');
const getCfg = require('./webpack.config.base.js');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = function() {
  let config = getCfg();

  if (process.env.NODE_ENV !== 'test') {
    config.entry = [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client'
    ].concat(config.entry);
  }

    config.devtool = '#source-map';

  config.output.path = '/';

  config.plugins = config.plugins.concat([
        new webpack.HotModuleReplacementPlugin(),
        new CompressionPlugin({
            asset: "[path].gz.js[query]",
            algorithm: "gzip",
            test: /\.js/,
            threshold: 10240,
            minRatio: 0.8
        })
  ]);

  config.module.rules = config.module.rules.concat([
    {
      test: /\.jsx?$/,
      use: [
        {
          loader: 'react-hot-loader'
        },
        {
          loader: 'babel-loader'
        }
      ],
      exclude: /node_modules/
    }
  ]);

  return config;
};
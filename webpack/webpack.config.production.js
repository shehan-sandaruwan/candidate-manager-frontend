/**
 * Created by sumith on 2/1/17.
 */

'use strict';

const path = require('path');
const webpack = require('webpack');
const getCfg = require('./webpack.config.base.js');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = () => {
  let config = getCfg();

  config.bail = true;
  config.profile = false;
  config.devtool = '#source-map';

  config.output = {
    path: path.join(__dirname,'../public'),
    pathinfo: true,
    publicPath: '/',
    filename: 'bundle.[hash].min.js'
  };

  config.plugins = config.plugins.concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compressor: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
        new webpack.NoEmitOnErrorsPlugin(),
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
          loader: 'babel-loader'
        }
      ],
      exclude: /node_modules/
    }
  ]);

  return config;
};


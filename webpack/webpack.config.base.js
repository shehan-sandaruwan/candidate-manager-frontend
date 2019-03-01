/**
 * Created by sumith on 2/1/17.
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;

const env = {
    production: NODE_ENV === 'production' || NODE_ENV === 'prod',
    staging: NODE_ENV === 'staging' || NODE_ENV === 'stag',
    test: NODE_ENV === 'test',
    development: NODE_ENV === 'development' || typeof NODE_ENV === 'undefined'
};

Object.assign(env, {
    build: (env.production || env.staging)
});

module.exports = function () {
    return {
        target: 'web',

        entry: [
            'babel-polyfill', path.join(__dirname, '../ui/App.jsx')
        ],

        output: {
            path: path.join(__dirname, '../public'),
            pathinfo: true,
            publicPath: '/',
            filename: 'bundle.js'
        },

        resolve: {
            modules: [
                path.join(__dirname, 'src'),
                'node_modules', 'src'
            ],
            extensions: ['.js', '.jsx'],
            alias: {
                'react': path.resolve('node_modules/react'),
                'react-dom': path.resolve('node_modules/react-dom')
            }
        },

        module: {
            rules: [
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'html-loader'
                        }
                    ]
                }, {
                    test: /\.css$/,
                    use: [
                        {
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader'
                        }
                    ]
                }, {
                    test: /\.(gif|svg|jpg|png)$/,
                    use: [
                        {
                            loader: 'file-loader',
                        }
                    ]

                }
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, '../ui/index.html'),
                filename: 'idx.template.html'
            }),
            new webpack.DefinePlugin({
                __DEV__: env.development,
                __STAGING__: env.staging,
                __PRODUCTION__: env.production,
                __CURRENT_ENV__: '\'' + (NODE_ENV) + '\'',
                'process.env.NODE_ENV': env.production ? 'production' : String(NODE_ENV)
            })
        ]
    };
};



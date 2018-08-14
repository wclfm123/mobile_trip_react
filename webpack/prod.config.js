/**
 * Created by jiang on 2017/7/3.
 */
const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const strip = require('strip-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 复制文件

module.exports = {
    devtool: 'source-map',
    context: path.resolve(__dirname, '../src'),
    entry: 'index.js',
    output: {
        filename: 'js/[hash].js',
        path: path.resolve(__dirname, '../build'),
        publicPath: './',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: [strip.loader('debug'), 'babel-loader']
            }, {
                test: /\.json$/, loader: 'json-loader',
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader?minimize=true&sourceMap', 'postcss-loader'] })
            }, {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader?minimize=true&sourceMap', 'postcss-loader', 'less-loader'] })
            }, {
                test: /\.jpe?g$|\.gif$|\.png$/,
                loaders: ['url-loader?limit=10000&name=images/[name].[ext]']
            }, {
                test: /\.ico|\.svg$|\.woff$|\.ttf$|\.eot$/,
                loaders: ['url-loader?limit=10000&name=fonts/[name].[ext]']
            }, {
                test: /\.json$/,
                exclude: /node_modules/,
                loaders: ['json-loader']
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader?minimize=true&sourceMap', 'postcss-loader', 'sass-loader'] })
            }, {
                test: /\.html$/,
                loader: 'html-loader?minimize'
            }
        ]
    },
    resolve: {
        alias: {
            'utils': path.join(__dirname, '../src/js/utils.js')
        },
        modules: [
            'src',
            'node_modules'
        ],
        extensions: ['.json', '.js', '.jsx']
    },
    plugins: [
        new CleanPlugin(['build'], { root: path.resolve(__dirname, '../') }),
        new ExtractTextPlugin('css/[hash].css'),
        new HtmlWebpackPlugin({
            title: 'lovely',
            filename: 'index.html',
            template: './index.html'
        }),
        new CopyWebpackPlugin([{
            from: 'images',
            to: 'images'
        }, {
            from: 'js',
            to: 'js'
        }]),
        new webpack.ProvidePlugin({ // 自动加载模块，而不必到处 import 或 require // 相当于设置全局变量
            utils: 'utils',
        }),
        new webpack.DefinePlugin({
            __DEVELOPMENT__: false,
            'process.env': { NODE_ENV: '"production"' },
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            },
            sourceMap: true
        })
    ]
};

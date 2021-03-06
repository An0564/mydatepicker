const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

// plugins
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const DedupePlugin = webpack.optimize.DedupePlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OccurenceOrderPlugin = webpack.optimize.OccurenceOrderPlugin;
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    target: 'web',
    cache: true,
    debug: true,
    devtool: 'source-map',

    module: {
        loaders: [
            {test: /\.ts$/, exclude: [/\.spec\.ts$/, /node_modules/], loader: 'ts'},
            {test: /\.html$/, loader: 'raw'},
            {test: /\.css$/, include: [path.resolve(__dirname, 'src')], loader: 'raw'}
        ],

        noParse: [
            /angular2\/bundles\/.+/
        ]
    },

    stats: {
        cached: true,
        cachedAssets: true,
        chunks: true,
        chunkModules: true,
        colors: true,
        hash: false,
        reasons: false,
        timings: true,
        version: false
    },

    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:5000',
            'src/main'
        ],
        vendor: [
            'es6-shim',
            'reflect-metadata',
            '@angular/common',
            '@angular/core',
            '@angular/platform-browser',
            '@angular/platform-browser-dynamic',
            'rxjs',
            'zone.js'
        ]
    },

    postcss: [
        autoprefixer({ browsers: ['last 3 versions', 'Firefox ESR'] })
    ],

    sassLoader: {
        outputStyle: 'compressed',
        precision: 10,
        sourceComments: false
    },

    plugins: [
        new DedupePlugin(),
        new OccurenceOrderPlugin(),
        new CommonsChunkPlugin({name: 'vendor', filename: 'vendor.js', minChunks: Infinity}),
        new HtmlWebpackPlugin({
            chunksSortMode: 'none',
            filename: 'index.html',
            hash: true,
            inject: 'body',
            template: './src/index.html'
        }),
        new LiveReloadPlugin({
            appendScriptTag: true
        })
    ],

    resolve: {
        extensions: ['', '.ts', '.js'],
        modulesDirectories: ['node_modules'],
        root: path.resolve('.')
    },

    output: {
        filename: '[name].js',
        path: path.resolve('./target'),
        publicPath: '/'
    },

    devServer: {
        contentBase: './src',
        historyApiFallback: true,
        port: 5000,
        publicPath: '/',
        stats: {
            cached: true,
            cachedAssets: true,
            chunks: true,
            chunkModules: false,
            colors: true,
            hash: false,
            reasons: true,
            timings: true,
            version: false
        }
    }
};
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [__dirname + '/src/js/Baseline.js', __dirname + '/src/scss/baseline.scss'],
    output: {
        path: __dirname + "/dist",
        filename: "./js/baseline.js"
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query:{
                    presets: ['es2015']
                }
            },
            {
                test: /\.(sass|scss)$/,
                loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
            }         
        ]
    },
    plugins:[
        new ExtractTextPlugin({
            filename: '/css/baseline.css',
            allChunks: true,
        })
    ]
};
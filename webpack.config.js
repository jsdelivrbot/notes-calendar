const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './front/app.js',
    output: {
        path: path.resolve(__dirname, './public/scripts'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-0']
            }
        }],
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin('../stylesheets/main.css'),
        // new CopyWebpackPlugin([{
        //     from: './index.html',
        //     to: path.resolve(__dirname, './public')
        // }, {
        //     from: './favicon.ico',
        //     to: path.resolve(__dirname, './public')
        // }])
    ]
};
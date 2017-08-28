const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, '../server/public/scripts'),
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
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'less-loader']
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin('../stylesheets/style.css'),
        new CopyWebpackPlugin([{
            from: './index.html',
            to: path.resolve(__dirname, '../server/public')
        }, {
            from: './favicon.ico',
            to: path.resolve(__dirname, '../server/public')
        }])
    ]
};
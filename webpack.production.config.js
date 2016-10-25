var path = require('path');
var webpack = require('webpack');

const PROD_URL = "'https://gorgias.gorgias.io/doc/openapi.json'"

module.exports = {
    entry: './src/main',
    output: {
        path: path.join(__dirname, 'static/bundle'),
        filename: 'bundle.js',
        publicPath: '/static/bundle/'
    },
    plugins: [
        new webpack.DefinePlugin({'__docUrl': PROD_URL})
    ],
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot', 'babel'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(otf|eot|woff|woff2|ttf|svg|png|jpg)$/,
                loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
            }
        ]
    },
    standard: {
      parser: 'babel-eslint'
    }
};

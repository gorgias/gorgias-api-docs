
var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.resolve(__dirname, 'src');
var BUILD_DIR = path.resolve(__dirname, 'static');

var entry = [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    APP_DIR + '/App.js'
  ];

var outputDev = {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  };

var outputBuild = {
    path: BUILD_DIR,
    filename: 'bundle.js'
  };

var plugins = [ new webpack.HotModuleReplacementPlugin() ];
var loaders = [
    {
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: APP_DIR,
    }
];

module.exports = {
  devtool: 'eval',
  entry: entry,
  output: outputDev,
  plugins: plugins,
  module: {
    loaders: loaders
  }
};

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var stylusLoader = ExtractTextPlugin.extract("style-loader", "css-loader!stylus-loader");

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:9090',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.styl$/,
        loader: stylusLoader
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, "node_modules/craftyjs"),
        loader: "transform?brfs"
      }
    ]
  },
  node: {  // this is for pixi.js 
    fs: "empty"
  },
  postLoaders: [
    {
      include: path.resolve(__dirname, 'node_modules/craftyjs'),
      loader: 'transform?brfs'
    }
  ],
  stylus: {
    use: [require('nib')(), require('rupture')()]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    port: 9090,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("[name].css")
  ]
};
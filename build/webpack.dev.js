const webpack = require('webpack');
const argv = require('yargs').argv;
const resolve = require('path').resolve;
const extname = require('path').extname;
const fs = require('fs');
const stylusLoader = "style-loader!css-loader?minimize!stylus-loader";
const PORT = parseInt((9000), 10) + 1;

//PATHS
const PUBLIC_PATH = 'http://localhost:' + PORT + '/';
const HMR_ROOT = 'http://localhost:' + PORT + '/';
const HMR = '__webpack_hmr';
const DIST = resolve('dist');
const ENTRY = resolve('src');

module.exports = {
  name: 'Site Client',
  entry: {
    bundle: [
      ENTRY,
      'webpack-hot-middleware/client?path=' + HMR_ROOT + HMR
    ],
  },
  output: {
    path: DIST,
    publicPath: PUBLIC_PATH,
    filename: '[name].js',
  },
  module: {
    loaders: [{
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file?name=fonts/[name].[ext]'
        + '&limit=10000&minetype=application/font-woff',
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      include: /font/,
      loader: 'file?name=fonts/[name].[ext]',
    }, {
      test: /\.(jpe?g|png|gif|svg)$/,

      loader: 'file?name=assets/[name].[ext]',
    }, {
      test: /\.css$/,
      include: /node_modules/,
      loader: 'style!css',
    }, {
      test: /\.styl$/,
      loader: stylusLoader
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  stylus: {
    use: [require('nib')(), require('rupture')()]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};

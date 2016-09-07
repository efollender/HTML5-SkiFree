const webpack = require('webpack');
const argv = require('yargs').argv;
const resolve = require('path').resolve;
const extname = require('path').extname;
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const stylusLoader = ExtractTextPlugin.extract("style-loader", "css-loader?minimize!stylus-loader");
const PORT = parseInt((9000), 10) + 1;

//PATHS
const DIST = resolve('dist');
const ENTRY = resolve('src');
const ENV = JSON.stringify(process.env.NODE_ENV);

function WriteStatsPlugin() {
  const args = [].slice.call(arguments);
  const destination = args.shift();
  const publicPath = '/';

  return function writeStats() {
    this.plugin('done', stats => {
      const json = stats.toJson();
      const assets = args.reduce((acc, chunk) => {
        return acc.concat(json.assetsByChunkName[chunk]);
      }, [])
        .filter(asset => ['.js', '.css'].indexOf(extname(asset)) > -1)
        .reduce((acc, asset) => {
          const ext = extname(asset).slice(1);

          acc[ext] = acc[ext] || [];
          acc[ext].push(publicPath + asset);

          return acc;
        }, {});

      fs.writeFileSync(
        destination,
        JSON.stringify(assets)
      );
    });
  };
};

module.exports = {
  name: 'Site Client',
  entry: {
    bundle: [
      ENTRY
    ],
  },
  output: {
    path: DIST,
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
      loader: 'babel',
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  stylus: {
    use: [require('nib')(), require('rupture')()]
  },
  plugins: [
    new WriteStatsPlugin(
      `config/webpack-stats.json`,
      '/dist/',
      'vendor',
      'bundle'
    ),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].[hash].js',
      minChunks: function getMinChunks(module) {
        return module.resource &&
               module.resource.indexOf('node_modules') !== -1;
      },
    }),
    new webpack.DefinePlugin(Object.assign({}, ENV, {
      __CLIENT__: true,
      __SERVER__: false,
    })),
    new ExtractTextPlugin('stylesheets/[name].css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        screw_ie8: true,
      },
    }),
    new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: ENV,
        },
    })
  ]
};

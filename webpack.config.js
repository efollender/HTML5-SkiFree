'use strict';

const ENV = (process.env.NODE_ENV || 'development').trim();

let configFile;
switch (ENV) {
case 'production':
  configFile = require('./build/webpack.prod.js');
  break;
case 'development':
default:
  configFile = require('./build/webpack.dev.js');
}

module.exports = configFile;

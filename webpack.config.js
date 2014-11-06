'use strict';

var webpack = require('webpack');

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: __dirname + '/dist',
    filename: 'main.js'
  },
  externals: {
    yaspm: 'commonjs yaspm'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.scss$/, loader: 'style!css!sass?' +
                                'includePaths[]=' +
                                __dirname + '/src/style'},
      {test: /\.(js|jsx)$/, loader: 'jsx-loader?harmony'}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      }
    })
  ]
};

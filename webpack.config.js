const path = require('path');

const webpack = require('webpack');
const RuntimeAnalyzerPlugin = require('webpack-runtime-analyzer');

let plugins = [];

const env = process.env.NODE_ENV;

if (env === 'production') {
  plugins = [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV === 'production' ? 'production' : 'development'),
    }),
  ];
} else if (env === 'analyze') {
  plugins = [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV === 'production' ? 'production' : 'development'),
    }),
    new RuntimeAnalyzerPlugin({
      mode: 'standalone',
      port: 0,
      open: true,
      watchModeOnly: true,
    }),
  ];
}


module.exports = {
  entry: './src/index.jsx',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.resolve(__dirname, 'public/static'),
    filename: 'main.js',
  },
  module: {
    rules: [
      { test: /\.jsx?$/, use: 'babel-loader' },
    ],
  },
  plugins,
};

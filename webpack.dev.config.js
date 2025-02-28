const path = require('path');
var webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: ['./src/index.js', 'webpack-hot-middleware/client', 'webpack/hot/dev-server'],
  output: {
    path: path.resolve('public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /(node_modules)/, query: {
                presets: ['env', 'react'], plugins: [ 'transform-class-properties']
            }},
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/   },
      { test: /\.scss$/, loader: ['style-loader', 'css-loader', 'sass-loader'], },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  target: 'web',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    host: 'localhost', // Defaults to `localhost`
    port: 3000, // Defaults to 8080
    proxy: {
      '^/*': {
        target: 'http://localhost:3000/',
        secure: false
      }
    }
  },
  plugins: [HtmlWebpackPluginConfig, new ExtractTextPlugin('bundle.css')]
}



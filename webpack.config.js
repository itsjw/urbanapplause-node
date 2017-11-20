const path = require('path');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html',
  inject: false
});

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  node: {
    fs: 'empty'
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
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000',
          'img-loader'
        ]
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig, new ExtractTextPlugin('bundle.css')],
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
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
    },
  }
}



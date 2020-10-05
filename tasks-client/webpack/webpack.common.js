const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PATH = {
  app: path.resolve(__dirname, '../src/index.js'),
  dist: path.resolve(__dirname, '../dist'),
}

module.exports = {
  entry: {
    app: PATH.app,
  },

  output: {
    filename: '[name].bundle.js',
    path: PATH.dist,
  },

  plugins: [

    new MiniCssExtractPlugin({
      filename: `css/[name].css`,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    rules:[
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {name: '[path][name].[ext]'}
      }, 
      {
        test: /\.(sa|sc)ss$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true
            }
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true, url: false }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true, config: { path: './postcss.config.js' } }
          },
          {
            loader: 'sass-loader',
          },
        ]
      },
    ]
  },
};
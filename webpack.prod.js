const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CopyPlugin = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');
const CssMinimizer = require('css-minimizer-webpack-plugin');

const config = {
  mode:'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'transaction.[contenthash].js'
  },
  module:{
    rules:[
      {
          test: /\.html$/,
          loader: 'html-loader',
          options: {
            sources: false            
          }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + "/";
              },
            },
          },
          "css-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            }           
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  optimization:{
    minimize: true,
    minimizer: [
      new CssMinimizer(),
      new Terser(),
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: ({ htmlWebpackPlugin }) => '<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>' + htmlWebpackPlugin.options.title + '</title></head><body><div id=\"app\"></div></body></html>',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      ignoreOrder:false,
      filename: '[name][fullhash].css',      
    })
  ]
};

module.exports = config;
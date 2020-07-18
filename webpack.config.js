const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: { main: './src/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
      rules: [{ 
          test: /\.js$/, 
          exclude: /node_modules/,
           /* use: { loader: "babel-loader" },
           exclude: /node_modules/ */
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                {
                  plugins: [
                    '@babel/plugin-proposal-class-properties'
                  ]
                }
              ]
            }
          }
              },
              {
              test: /\.css$/, 
              use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] 
            },
            {
              test: /\.(woff|woff2|ttf)$/,
              use: 'file-loader?name=./fonts/[name].[ext]'
            },
            {
              test: /\.(jpg|jpeg|png|svg|webp)$/,
              use: 'file-loader?name=./images/[name].[ext]&esModule=false'
            }
          ]
      },
      plugins: [
        new MiniCssExtractPlugin({filename: 'style.[contenthash].css'}),
        new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.css$/g,
          cssProcessor: require('cssnano'),
          cssProcessorPluginOptions: {
                  preset: ['default'],
          },
          canPrint: true
  }),
        new HtmlWebpackPlugin({
          inject: false, 
          template: './src/index.html', 
          filename: 'index.html' 
        }),
        new WebpackMd5Hash()
    ]
}
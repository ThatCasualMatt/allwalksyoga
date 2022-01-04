const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const PostCSSPresetEnv = require('postcss-preset-env');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDev ? 'development' : 'production',
  stats: {
    colors: true,
    preset: 'minimal'
  },
  performance: { hints: isDev ? false : 'warning' },
  // Eval does not work for css source maps
  // `All values enable source map generation except eval and false value.`
  // https://github.com/webpack-con~b/css-loader
  devtool: isDev ? 'cheap-module-source-map' : 'source-map',
  entry: [
    path.resolve(__dirname, 'src/_assets/js/custom.js'),
    path.resolve(__dirname, 'src/_assets/css/style.css'),
    path.resolve(__dirname, 'src/_assets/css/responsive.css')
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/js'),
    publicPath: '/js/'
  },
  plugins: [
    new WebpackManifestPlugin(),
    new MiniCssExtractPlugin({
      filename: '../css/[name].css'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/_assets/images'),
          to: path.resolve(__dirname, 'dist/images')
        },
        {
          from: path.resolve(__dirname, 'src/_assets/font'),
          to: path.resolve(__dirname, 'dist/font')
        }
      ]
    })
  ],
  ...(!isDev && {
    optimization: {
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()]
    }
  }),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?url=false',
          {
            loader: 'postcss-loader',
            options: { postcssOptions: { plugins: [PostCSSPresetEnv] } }
          },
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      // Helpful alias for importing assets
      assets: path.resolve(__dirname, 'src/_assets')
    }
  }
};

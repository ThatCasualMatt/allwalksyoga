const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: [
    "./src/_includes/js/custom.js",
    "./src/_includes/css/style.css",
    "./src/_includes/css/responsive.css",
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader?url=false"],
      },
    ],
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing
      // minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../css/[name].css",
    }),
  ],
  output: {
    filename: "custom.js",
    path: path.resolve(__dirname, "dist/js"),
  },
};

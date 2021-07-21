const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./app/index.html",
  filename: "./index.html",
  minify: false,
});
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CopyPlugin = new CopyWebpackPlugin({
  patterns: [{ from: "_redirects" }],
});

module.exports = {
  entry: "./app/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index_bundle.js",
    publicPath: "/",
  },

  module: {
    rules: [
      { test: /\.(js)$/, exclude: /node_modules/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  mode: "production",
  // mode: process.env.NODE_ENV === "production" ? "production" : "development",
  plugins: [htmlPlugin, CopyPlugin],

  devServer: {
    historyApiFallback: true,
  },
};

/* eslint strict: 0 */
"use strict";

const path = require("path");
const webpack = require("webpack");
var argv = require("minimist")(process.argv.slice(2));
const isWeb = argv && argv.target === "web";
const output = isWeb ? "build/web" : "build/electron";

let options = {
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015", "stage-1"]
        }
      },
      {
        test: /\.css/,
        loaders: ["style-loader", "css-loader"]
      }
    ]
  },
  output: {
    path: path.join(__dirname, output),
    publicPath: path.join(__dirname, "src"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"],
    mainFields: [
      "webpack",
      "browser",
      "web",
      "browserify",
      ["jam", "main"],
      "main"
    ]
  },
  entry: ["./src/Ui/index"],
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],
  target: "electron"
};

module.exports = options;

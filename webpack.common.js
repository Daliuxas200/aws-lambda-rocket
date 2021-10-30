const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  target: "node",
  watch: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    libraryTarget: "commonjs2",
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  externals: {
    "aws-sdk": "aws-sdk",
  },
};

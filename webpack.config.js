const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    "background/service-worker": "./src/background/service-worker.js",
    "content/content": "./src/content/content.js",
    "styles/tailwind": "./src/styles/tailwind.css",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },
  devtool: false,
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
    moduleIds: "named",
    chunkIds: "named",
    mangleExports: false,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/manifest.json",
          to: "manifest.json",
        },
        {
          from: "src/content/content.html",
          to: "content/content.html",
        },
        {
          from: "src/icons",
          to: "icons",
        },
      ],
    }),
  ],
};

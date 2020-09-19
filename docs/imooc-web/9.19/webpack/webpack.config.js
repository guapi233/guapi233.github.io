const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const config = {
  // webpack打包的入口，相对路径是根据执行命令的地方来计算的，如果配置了package.json则根据package.json来计算
  entry: "./src/index.js",
  // webpack打包的出口，路径必须为绝对路径
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/dist"),
  },
  module: {
    // 匹配结尾为 .css 的文件，按序使用css-loader和style-loader
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.(sass|scss)/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|svg)/,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: "./dist",
            },
          },
        ],
      },
    ],
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  // 热更新
  devServer: {
    hot: true,
    inline: true,
    contentBase: "./dist",
  },
};

module.exports = config;

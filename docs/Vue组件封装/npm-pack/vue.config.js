const path = require("path");

module.exports = {
  pages: {
    index: {
      // 修改项目的入口文件
      entry: "examples/main.js",
      template: "public/index.html",
      filename: "index.html",
    },
  },

  // 拓展webpack配置，使 components 加入编译
  chainWebpack: (config) => {
    config.module
      .rule("js")
      .include.add(path.resolve(__dirname, "components"))
      .end()
      .use("babel")
      .loader("babel-loader")
      .tap((options) => {
        // 修改它的选项
        return options;
      });
  },
};

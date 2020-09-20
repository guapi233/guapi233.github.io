// 该插件可以帮助我们自动引入其他 gulp 插件（只能以gulp开头的库）
const plugins = require("gulp-load-plugins")();
const { src, dest, series, watch } = require("gulp");
const del = require("del");
const browserSync = require("browser-sync");
const reload = browserSync.reload;

// 压缩js
const js = (cb) => {
  src("js/*.js")
    // 下一个环节
    .pipe(plugins.uglify())
    .pipe(dest("./dist/js"))
    .pipe(reload({ stream: true }));

  // 提醒 gulp 阶段任务完成了
  cb();
};

// 预编译，压缩，输出css文件
const css = (cb) => {
  src("css/*.scss")
    .pipe(plugins.sass({ outputStyle: "compressed" }))
    .pipe(
      plugins.autoprefixer({
        cascade: false,
        remove: false,
      })
    )
    .pipe(dest("./dist"))
    .pipe(reload({ stream: true }));

  cb();
};

// 删除dist目录中的内容
const clean = (cb) => {
  del("./dist");

  cb();
};

// 监听这些文件的变化
const watcher = () => {
  watch("js/*.js", js);
  watch("css/*.scss", css);
};

// server任务
const serve = (cb) => {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });

  cb();
};

exports.scripts = js;
exports.styles = css;
exports.clean = clean;
exports.serve = serve;
exports.default = series([clean, js, css, serve, watcher]);

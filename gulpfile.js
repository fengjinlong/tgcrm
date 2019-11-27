// eslint-disable-next-line no-undef
const gulp = require("gulp");
const babel = require("gulp-babel");
const rollup = require("gulp-rollup");
const replace = require("rollup-plugin-replace");
const rename = require("gulp-rename");
const gulpCopy = require("gulp-copy");
const eslint = require('gulp-eslint');
const gulpTslint = require("gulp-tslint");
const ts = require("gulp-typescript");
const tsConfig = ts.createProject("./tsconfig.json");

const entry = "./src/server/**/*.ts";
const cleanEntry = ["./src/server/config/index.ts"];

const babelConfig = {
  presets: ["@babel/preset-typescript"],
  plugins: [
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true
      }
    ],
    "@babel/plugin-transform-modules-commonjs"
  ]
};

//对代码进行检查的环境
function buildlint() {
  return gulp
    .src(entry)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

//上线环境
function buildprod() {
  return gulp
    .src(entry)
    .pipe(
      babel({
        babelrc: false,
        ignore: cleanEntry,
        ...babelConfig
      })
    )
    .pipe(gulp.dest("dist"));
}

//清洗环境
function buildconfig() {
  return gulp
    .src(entry)
    .pipe(
      rollup({
        output: {
          file: "index.js",
          format: "cjs"
        },
        plugins: [
          replace({
            "process.env.NODE_ENV": JSON.stringify("production")
          })
        ],
        input: cleanEntry
      })
    )
    .pipe(
      rename(function(path) {
        path.extname = ".js";
      })
    )
    .pipe(gulp.dest("./dist"));
}

let build;

if (process.env.NODE_ENV == "production") {
  build = gulp.series(buildprod);
}
if (process.env.NODE_ENV == "lint") {
  build = gulp.series(buildlint);
}
gulp.task("default", build);

// // eslint-disable-next-line no-undef
// const gulp = require("gulp");
// const babel = require("gulp-babel");
// const rollup = require("gulp-rollup");
// const replace = require("rollup-plugin-replace");
// const rename = require("gulp-rename");
// const gulpCopy = require("gulp-copy");
// const eslint = require('gulp-eslint');
// const gulpTslint = require("gulp-tslint");
// const ts = require("gulp-typescript");
// const tsConfig = ts.createProject("./tsconfig1.json");

// const entry = "./src/server/**/*.js";
// const cleanEntry = ["./src/server/config/index.js"];

// const babelConfig = {
//   // presets: ["@babel/preset-typescript"],
//   plugins: [
//     [
//       "@babel/plugin-proposal-decorators",
//       {
//         legacy: true
//       }
//     ],
//     "@babel/plugin-transform-modules-commonjs"
//   ]
// };

// //对代码进行检查的环境
// function buildlint() {
//   return gulp
//     .src(entry)
//     .pipe(eslint())
//     .pipe(eslint.format())
//     .pipe(eslint.failAfterError());
// }

// //上线环境
// function buildprod() {
//   return gulp
//     .src(entry)
//     .pipe(
//       babel({
//         babelrc: true,
//         ignore: cleanEntry,
//         ...babelConfig
//       })
//     )
//     // .pipe(tsConfig())
//     .pipe(gulp.dest("dist"));
// }

// //清洗环境
// function buildconfig() {
//   return gulp
//     .src(entry)
//     .pipe(
//       rollup({
//         output: {
//           file: "index.js",
//           format: "cjs"
//         },
//         plugins: [
//           replace({
//             "process.env.NODE_ENV": JSON.stringify("production")
//           })
//         ],
//         input: cleanEntry
//       })
//     )
//     .pipe(
//       rename(function(path) {
//         path.extname = ".js";
//       })
//     )
//     .pipe(gulp.dest("./dist"));
// }

// let build;

// if (process.env.NODE_ENV == "production") {
//   build = gulp.series(buildprod);
// }
// if (process.env.NODE_ENV == "lint") {
//   build = gulp.series(buildlint);
// }
// gulp.task("default", build);



const gulp = require("gulp");
const watch = require("gulp-watch");
const babel = require("gulp-babel");
const entry = "./src/server/**/*.js";
const configEntry = "./src/server/config/index.js";
const rollup = require('gulp-rollup');
const replace = require("rollup-plugin-replace");
const eslint = require('gulp-eslint');
//开发环境
function buildDev() {
    return watch(entry, {
        ignoreInitial: false
    }, function () {
        gulp.src(entry).pipe(babel({
                "babelrc": false,
                "plugins": ["@babel/plugin-transform-modules-commonjs"]
            }))
            .pipe(gulp.dest('dist'));
    })
}
//上线环境
function buildProd() {
    return gulp.src(entry).pipe(babel({
            "babelrc": false,
            ignore: [configEntry],
            "plugins": [
                "@babel/plugin-transform-modules-commonjs"
            ]
        }))
        .pipe(gulp.dest('dist'));
}

function buildConfig() {
    return gulp.src(entry)
        .pipe(rollup({
            input: configEntry,
            output: {
                format: "cjs"
            },
            plugins: [
                replace({
                    "process.env.NODE_ENV": JSON.stringify('production')
                })
            ]
        }))
        .pipe(gulp.dest('./dist'));
}

function buildLint() {
    return gulp.src([entry])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

let build = gulp.series(buildDev);
if (process.env.NODE_ENV == "production") {
    build = gulp.series(buildProd, buildConfig);
}
if (process.env.NODE_ENV == "lint") {
    build = gulp.series(buildLint);
}
gulp.task("default", build);
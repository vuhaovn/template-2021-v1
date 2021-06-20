const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const terser = require('gulp-terser');
const browserSync = require('browser-sync');

// Sass Task
function sassTask() {
  const plugins = [
    autoprefixer(),
    cssnano()
  ]
  return src('./app/scss/**/*.scss', {sourcemaps: true})
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(dest('dist/css', {sourcemaps: '.'}));
}

// Javascript Task
function jsTask() {
  return src('./app/js/**/*.js', {sourcemaps: true})
    .pipe(terser())
    .pipe(dest('dist/js', {sourcemaps: '.'}));
}

// Browsersync Init Task
function browsersyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: '.'
    }
  });
  cb();
}

// Browsersync Reload Task
function browsersyncReload(cb) {
  browserSync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch('*.html', browsersyncReload);
  watch(['./app/scss/**/*.scss', './app/js/**/*.js'], series(sassTask, jsTask, browsersyncReload));
}

// Default Gulp Task
exports.default = series(
  sassTask,
  jsTask,
  browsersyncServe,
  watchTask,
)
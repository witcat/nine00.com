const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const uglify = require('gulp-uglify')
const inline = require('gulp-inline')
const htmlmin = require('gulp-htmlmin')

gulp.task('compile', () => {
  gulp.src('src/index.html')
    .pipe(inline({
      base: 'src/',
      js: uglify,
      css: [sass({
        errLogToConsole: true
      }), autoprefixer({
        browsers: ['last 2 versions']
      }), cssnano({discardComments:true})]
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['compile'], () => {
  browserSync.init({
    server: "dist"
  });
  gulp.watch("src/**/*", ['compile']);
});
